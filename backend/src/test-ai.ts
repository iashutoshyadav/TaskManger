import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key found:", apiKey ? "Yes (length: " + apiKey.length + ")" : "No");

if (!apiKey) {
    console.error("No GEMINI_API_KEY found in environment!");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function testAI() {
    try {
        console.log("Testing Gemini API...");
        const result = await model.generateContent("Say hello!");
        console.log("AI Response:", result.response.text());
        console.log("SUCCESS: Gemini API is working.");
    } catch (error: any) {
        console.error("FAILURE: Gemini API error:", error.message);
        if (error.response) {
            console.error("Error Details:", JSON.stringify(error.response, null, 2));
        }
    }
}

testAI();
