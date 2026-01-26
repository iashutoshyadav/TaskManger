import * as repo from "../repositories/project.repository";
import { CreateProjectInput, UpdateProjectInput } from "../dtos/project.dto";
import { CreateProjectDTO } from "../dtos/create-project.dto";
import { ApiError } from "../utils/ApiError";
import mongoose from "mongoose";
import { findUserById } from "../repositories/user.repository";

export const createNewProject = async (
  input: CreateProjectInput,
  userId: string
) => {
  const user = await findUserById(userId);
  if (!user) throw ApiError.notFound("User not found");

  const data: any = {
    title: input.title,
    description: input.description,
    requirements: input.requirements,
    teamSize: input.teamSize,
    status: input.status,
    startDate: new Date(input.startDate),
    endDate: input.endDate ? new Date(input.endDate) : undefined,
    creatorId: new mongoose.Types.ObjectId(userId),
    organizationId: user.organizationId,
  };

  return repo.createProject(data);
};

export const fetchUserProjects = async (
  userId: string,
  page: number,
  limit: number
) => {
  const user = await findUserById(userId);
  if (!user?.organizationId) {
    return repo.findProjectsByOrganization("", page, limit); // Or handle empty
  }
  return repo.findProjectsByOrganization(user.organizationId.toString(), page, limit);
};

export const getProjectDetails = async (projectId: string, userId: string) => {
  const project = await repo.findProjectById(projectId);
  if (!project) throw ApiError.notFound("Project not found");

  const user = await findUserById(userId);
  if (project.organizationId.toString() !== user?.organizationId?.toString()) {
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

  const updateData: Partial<any> = { ...input };
  if (input.startDate) updateData.startDate = new Date(input.startDate);
  if (input.endDate) updateData.endDate = new Date(input.endDate);

  return repo.updateProjectById(projectId, updateData);
};

export const deleteProject = async (projectId: string, userId: string) => {
  const project = await repo.findProjectById(projectId);
  if (!project) throw ApiError.notFound("Project not found");

  const user = await findUserById(userId);
  const isCreator = project.creatorId.toString() === userId;
  const isAdmin = user?.role === "ADMIN";

  if (!isCreator && !isAdmin) {
    throw ApiError.forbidden("You do not have permission to delete this project");
  }

  return repo.deleteProjectById(projectId);
};
