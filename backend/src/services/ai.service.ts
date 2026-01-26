import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

const genAI = new GoogleGenerativeAI(env.geminiApiKey);
// Using gemini-2.0-flash as it's the most stable and widely available
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

const generateWithRetry = async (prompt: string, retries = 3, delayMs = 2000): Promise<any> => {
    for (let i = 0; i < retries; i++) {
        try {
            return await model.generateContent(prompt);
        } catch (error: any) {
            const isRateLimit = error?.status === 429 || error?.response?.status === 429;
            const isServerOverload = error?.status === 503 || error?.response?.status === 503;

            if ((isRateLimit || isServerOverload) && i < retries - 1) {
                logger.warn(`AI Rate Limit hit. Retrying in ${delayMs}ms... (Attempt ${i + 1}/${retries})`);
                await new Promise(resolve => setTimeout(resolve, delayMs));
                continue; // Retry
            }
            throw error;
        }
    }
};

export interface AIWorkspaceResponse {
    project: {
        title: string;
        description: string;
        requirements: string;
        phases: string[];
    };
    tasks: {
        title: string;
        description: string;
        priority: "LOW" | "MEDIUM" | "HIGH";
        dueDateOffsetDays: number;
    }[];
}

/**
 * Generate a complete project structure based on a user goal
 */
export const generateWorkspaceStructure = async (goal: string): Promise<AIWorkspaceResponse> => {
    const prompt = `
        You are a senior project manager and workspace architect.
        User Goal: "${goal}"

        Create a comprehensive project structure. Return ONLY a valid JSON object with this exact structure:
        {
            "project": {
                "title": "Short catchy title",
                "description": "Engaging overview",
                "requirements": "3 key technical or business requirements",
                "phases": ["Phase 1: ...", "Phase 2: ...", "Phase 3: ..."]
            },
            "tasks": [
                {
                    "title": "Task name",
                    "description": "Short instruction",
                    "priority": "LOW" | "MEDIUM" | "HIGH",
                    "dueDateOffsetDays": number (days from today)
                }
            ]
        }

        Requirements:
        - Generate exactly 10 high-quality tasks.
        - Tasks should be logically ordered.
        - Return ONLY JSON. No markdown formatting or extra text.
    `;

    try {
        const result = await generateWithRetry(prompt);

        if (!result.response || !result.response.candidates || result.response.candidates.length === 0) {
            logger.error("AI Generation Error: No candidates returned. Safety filters might be blocking the response.");
            throw ApiError.internal("AI failed to generate content (blocked or filtered)");
        }

        const text = result.response.text();
        logger.info("AI Generation Success for goal: %s", goal);

        // Clean markdown if AI includes it
        const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleaned) as AIWorkspaceResponse;
    } catch (error: any) {
        logger.error("AI Generation Error Details: %s", error?.message || error);
        if (error?.response) {
            logger.error("AI Response Error Body: %j", error.response);
        }
        if (error?.status === 429) {
            throw ApiError.internal("AI Service is currently busy (Rate Limit). Please try again in a few seconds.");
        }
        throw ApiError.internal("Failed to generate project structure using AI");
    }
};

/**
 * Generate a daily standup summary
 */
export const generateDailyStandup = async (
    teamChat: string[],
    stats: { total: number; completed: number; overdue: number }
): Promise<string> => {
    const prompt = `
        You are a Team Lead. Summarize the last 24 hours for the team using this data:
        
        Recent Messages:
        ${teamChat.join("\n")}

        Metrics:
        Total Tasks: ${stats.total}
        Completed: ${stats.completed}
        Overdue: ${stats.overdue}

        Output format:
        - A one-paragraph summary.
        - Focus on progress and blockers.
        - Sound professional and encouraging.
        - Maximum 3-4 sentences.
    `;

    try {
        const result = await generateWithRetry(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("AI Standup Error:", error);
        return "The AI leader is currently unavailable to summarize. Keep up the great work!";
    }
};

/**
 * Enhance a single task based on its title
 */
export const enhanceTaskDetails = async (title: string): Promise<{
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDateOffsetDays: number;
}> => {
    const prompt = `
        You are a productivity expert.
        Task Title: "${title}"

        Provide detailed task information. Return ONLY a valid JSON object:
        {
            "description": "Detailed explanation and steps (2-3 sentences)",
            "priority": "LOW" | "MEDIUM" | "HIGH",
            "dueDateOffsetDays": number (1-7)
        }
    `;

    try {
        logger.info("AI Enhance: Starting for title: %s", title);
        const result = await generateWithRetry(prompt);
        const text = result.response.text();
        logger.info("AI Enhance: Got response, length: %d", text.length);
        const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        logger.info("AI Enhance: Successfully parsed JSON");
        return parsed;
    } catch (error: any) {
        logger.error("AI Enhance Error: %s", error?.message || error);

        if (error?.response) {
            logger.error("AI Enhance Error Response: %j", error.response);
        }

        if (error?.status === 429) {
            throw ApiError.internal("AI Service is currently busy (Rate Limit). Please try again in a few seconds.");
        }

        // Log the full error object
        logger.error("AI Enhance Full Error: %j", {
            message: error?.message,
            status: error?.status,
            name: error?.name
        });

        throw ApiError.internal("Failed to enhance task using AI");
    }
};
