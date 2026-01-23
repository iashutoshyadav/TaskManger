import mongoose from "mongoose";
import { ProjectStatus } from "../models/project.model";

export interface CreateProjectDTO {
  title: string;
  description: string;
  requirements: string;
  teamSize: number;
  status?: ProjectStatus;
  startDate: Date;
  endDate?: Date;
  creatorId: mongoose.Types.ObjectId;
}
