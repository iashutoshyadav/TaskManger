import mongoose, { Document, Schema } from "mongoose";

export enum InvitationStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    EXPIRED = "EXPIRED",
}

export interface IInvitation extends Document {
    email: string;
    organizationId: mongoose.Types.ObjectId;
    inviterId: mongoose.Types.ObjectId;
    token: string;
    status: InvitationStatus;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const InvitationSchema = new Schema<IInvitation>(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        inviterId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        token: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: Object.values(InvitationStatus),
            default: InvitationStatus.PENDING,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Create an index that automatically expires documents after expiresAt
InvitationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const InvitationModel = mongoose.model<IInvitation>(
    "Invitation",
    InvitationSchema
);
