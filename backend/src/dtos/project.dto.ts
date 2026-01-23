import { z } from "zod";
import { ProjectStatus } from "../models/project.model";

export const CreateProjectDto = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1),
    requirements: z.string().min(1),
    teamSize: z.number().min(1),
    status: z.nativeEnum(ProjectStatus).optional(),
    startDate: z.string().datetime().or(z.date()),
    endDate: z.string().datetime().or(z.date()).optional(),
});

export const UpdateProjectDto = CreateProjectDto.partial().refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field must be updated",
    }
);

export type CreateProjectInput = z.infer<typeof CreateProjectDto>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectDto>;
