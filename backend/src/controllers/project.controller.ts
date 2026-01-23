import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CreateProjectDto, UpdateProjectDto } from "../dtos/project.dto";
import * as projectService from "../services/project.service";

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const data = CreateProjectDto.parse(req.body);
        const project = await projectService.createNewProject(data, req.userId!);
        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
};

export const getMyProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await projectService.fetchUserProjects(req.userId!, page, limit);
        res.status(200).json({
            data: result.projects,
            total: result.total,
            page,
            limit,
        });
    } catch (error) {
        next(error);
    }
};

export const getProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const project = await projectService.getProjectDetails(req.params.id, req.userId!);
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

export const updateProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const data = UpdateProjectDto.parse(req.body);
        const project = await projectService.updateProject(req.params.id, data, req.userId!);
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        await projectService.deleteProject(req.params.id, req.userId!);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
