import api from "@/lib/api";

export const generateMagicWorkspace = async (goal: string) => {
    const response = await api.post("/ai/magic-workspace", { goal });
    return response.data;
};

export const getDailyStandup = async () => {
    const response = await api.get("/ai/daily-standup");
    return response.data;
};

export const enhanceTask = async (title: string) => {
    const response = await api.post("/ai/enhance-task", { title });
    return response.data;
};
