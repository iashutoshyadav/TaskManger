import mongoose, { Schema, Document } from "mongoose";

export enum ProjectStatus {
    PLANNING = "PLANNING",
    ACTIVE = "ACTIVE",
    ON_HOLD = "ON_HOLD",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export interface IProject extends Document {
    title: string;
    description: string;
    requirements: string;
    teamSize: number;
    status: ProjectStatus;
    startDate: Date;
    endDate?: Date;
    creatorId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        requirements: {
            type: String,
            required: true,
            trim: true,
        },
        teamSize: {
            type: Number,
            required: true,
            min: 1,
        },
        status: {
            type: String,
            enum: Object.values(ProjectStatus),
            default: ProjectStatus.PLANNING,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
        },
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

export const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);
