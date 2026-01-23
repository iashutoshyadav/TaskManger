export enum ProjectStatus {
    PLANNING = "PLANNING",
    ACTIVE = "ACTIVE",
    ON_HOLD = "ON_HOLD",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export interface Project {
    _id: string;
    title: string;
    description: string;
    requirements: string;
    teamSize: number;
    status: ProjectStatus;
    startDate: string;
    endDate?: string;
    creatorId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProjectPayload {
    title: string;
    description: string;
    requirements: string;
    teamSize: number;
    status?: ProjectStatus;
    startDate: string;
    endDate?: string;
}

export interface UpdateProjectPayload extends Partial<CreateProjectPayload> { }
