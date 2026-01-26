import mongoose, { Document, Schema } from "mongoose";

export interface IOrganization extends Document {
    name: string;
    slug: string;
    creatorId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const OrganizationSchema = new Schema<IOrganization>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const OrganizationModel = mongoose.model<IOrganization>(
    "Organization",
    OrganizationSchema
);
