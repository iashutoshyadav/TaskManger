import { ProjectModel, IProject } from "../models/project.model";
import mongoose from "mongoose";

export const createProject = async (data: any): Promise<IProject> => {
    return ProjectModel.create(data);
};

export const findProjectsByCreator = async (
    creatorId: string,
    page: number,
    limit: number
): Promise<{ projects: IProject[]; total: number }> => {
    const skip = (page - 1) * limit;
    const [projects, total] = await Promise.all([
        ProjectModel.find({ creatorId: new mongoose.Types.ObjectId(creatorId) })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec(),
        ProjectModel.countDocuments({ creatorId: new mongoose.Types.ObjectId(creatorId) }),
    ]);
    return { projects, total };
};

export const findProjectById = async (id: string): Promise<IProject | null> => {
    return ProjectModel.findById(id).exec();
};

export const updateProjectById = async (
    id: string,
    data: any
): Promise<IProject | null> => {
    return ProjectModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).exec();
};

export const deleteProjectById = async (id: string): Promise<void> => {
    await ProjectModel.findByIdAndDelete(id).exec();
};
