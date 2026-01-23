import api from "@/lib/api";
import { Project, CreateProjectPayload, UpdateProjectPayload } from "@/types/project";

export interface PaginatedProjects {
    data: Project[];
    page: number;
    limit: number;
    total: number;
}

export const getProjects = async (params: { page: number; limit: number }): Promise<PaginatedProjects> => {
    const { data } = await api.get<PaginatedProjects>("/projects", { params });
    return data;
};

export const getProjectById = async (id: string): Promise<Project> => {
    const { data } = await api.get<Project>(`/projects/${id}`);
    return data;
};

export const createProject = async (payload: CreateProjectPayload): Promise<Project> => {
    const { data } = await api.post<Project>("/projects", payload);
    return data;
};

export const updateProject = async (id: string, payload: UpdateProjectPayload): Promise<Project> => {
    const { data } = await api.put<Project>(`/projects/${id}`, payload);
    return data;
};

export const deleteProject = async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
};
