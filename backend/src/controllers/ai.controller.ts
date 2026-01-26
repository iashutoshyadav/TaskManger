import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as aiService from "../services/ai.service";
import * as projectService from "../services/project.service";
import * as taskService from "../services/task.service";
import * as messageService from "../services/message.service";
import { findUserById } from "../repositories/user.repository";
import { ApiError } from "../utils/ApiError";
import mongoose from "mongoose";

/**
 * AI Magic: Generate a project and 10 tasks in bulk
 */
export const generateMagicWorkspace = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { goal } = req.body;
        if (!goal) throw ApiError.badRequest("Goal is required for AI magic");

        // 1. Generate structure using Gemini
        const data = await aiService.generateWorkspaceStructure(goal);

        // 2. Create the Project
        const project = await projectService.createNewProject({
            title: data.project.title,
            description: data.project.description,
            requirements: data.project.requirements + "\n\nPhases:\n" + data.project.phases.join("\n"),
            teamSize: 5,
            status: "PLANNING" as any,
            startDate: new Date().toISOString(),
        } as any, req.userId!);

        // 3. Create the Tasks
        const taskPromises = data.tasks.map(t => {
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + t.dueDateOffsetDays);

            return taskService.createNewTask({
                title: t.title,
                description: t.description,
                priority: t.priority as any,
                dueDate: dueDate.toISOString(),
            } as any, req.userId!);
        });

        await Promise.all(taskPromises);

        res.status(201).json({
            message: "AI Workspace established successfully",
            project,
            taskCount: data.tasks.length
        });
    } catch (error) {
        next(error);
    }
};

/**
 * AI Standup: Summarize recent activity
 */
export const getDailyStandup = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await findUserById(req.userId!);
        const orgId = user?.organizationId?.toString();
        if (!orgId) return res.json({ summary: "Connect to a workspace to see your AI daily standup." });

        // 1. Fetch recent messages
        const messages = await messageService.getRecentMessages(orgId, 20);
        const chatLogs = messages.map(m => `${m.senderId}: ${m.content}`);

        // 2. Fetch task metrics (simulated or simplified)
        const { tasks } = await taskService.fetchTasks({
            userId: req.userId!,
            page: 1,
            limit: 100
        });

        const stats = {
            total: tasks.length,
            completed: tasks.filter((t: any) => t.status === "COMPLETED").length,
            overdue: tasks.filter((t: any) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "COMPLETED").length
        };

        // 3. Generate summary
        const summary = await aiService.generateDailyStandup(chatLogs, stats);

        res.json({ summary });
    } catch (error) {
        next(error);
    }
};

/**
 * AI Task Magic: Enhance a single task description and priority based on title
 */
export const enhanceTask = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title } = req.body;
        if (!title) throw ApiError.badRequest("Task title is required");

        const details = await aiService.enhanceTaskDetails(title);
        res.json(details);
    } catch (error) {
        next(error);
    }
};
