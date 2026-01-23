import mongoose, { HydratedDocument } from "mongoose";
import { ProjectModel, IProject } from "../models/project.model";
import { CreateProjectDTO } from "../dtos/create-project.dto";

export const createProject = async (
  data: CreateProjectDTO
): Promise<HydratedDocument<IProject>> => {
  return ProjectModel.create(data);
};

export const findProjectsByCreator = async (
  creatorId: string,
  page: number,
  limit: number
): Promise<{ projects: IProject[]; total: number }> => {
  const skip = (page - 1) * limit;
  const creatorObjectId = new mongoose.Types.ObjectId(creatorId);

  const [projects, total] = await Promise.all([
    ProjectModel.find({ creatorId: creatorObjectId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean<IProject[]>(),
    ProjectModel.countDocuments({ creatorId: creatorObjectId }),
  ]);

  return { projects, total };
};

export const findProjectById = async (
  id: string
): Promise<IProject | null> => {
  return ProjectModel.findById(id).lean<IProject | null>();
};

export const updateProjectById = async (
  id: string,
  data: Partial<IProject>
): Promise<IProject | null> => {
  return ProjectModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean<IProject | null>();
};

export const deleteProjectById = async (id: string): Promise<void> => {
  await ProjectModel.findByIdAndDelete(id);
};
