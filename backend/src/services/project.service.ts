import * as repo from "../repositories/project.repository";
import { CreateProjectInput, UpdateProjectInput } from "../dtos/project.dto";
import { ApiError } from "../utils/ApiError";
import mongoose from "mongoose";

export const createNewProject = async (input: CreateProjectInput, userId: string) => {
    return repo.createProject({
        ...input,
        creatorId: new mongoose.Types.ObjectId(userId),
        startDate: new Date(input.startDate),
        endDate: input.endDate ? new Date(input.endDate) : undefined,
    });
};

export const fetchUserProjects = async (userId: string, page: number, limit: number) => {
    return repo.findProjectsByCreator(userId, page, limit);
};

export const getProjectDetails = async (projectId: string, userId: string) => {
    const project = await repo.findProjectById(projectId);
    if (!project) throw ApiError.notFound("Project not found");

    if (project.creatorId.toString() !== userId) {
        throw ApiError.forbidden("You do not have access to this project");
    }

    return project;
};

export const updateProject = async (
    projectId: string,
    input: UpdateProjectInput,
    userId: string
) => {
    const project = await repo.findProjectById(projectId);
    if (!project) throw ApiError.notFound("Project not found");

    if (project.creatorId.toString() !== userId) {
        throw ApiError.forbidden("You do not have permission to update this project");
    }

    const updateData = { ...input } as any;
    if (input.startDate) updateData.startDate = new Date(input.startDate);
    if (input.endDate) updateData.endDate = new Date(input.endDate);

    return repo.updateProjectById(projectId, updateData);
};

export const deleteProject = async (projectId: string, userId: string) => {
    const project = await repo.findProjectById(projectId);
    if (!project) throw ApiError.notFound("Project not found");

    if (project.creatorId.toString() !== userId) {
        throw ApiError.forbidden("You do not have permission to delete this project");
    }

    return repo.deleteProjectById(projectId);
};
