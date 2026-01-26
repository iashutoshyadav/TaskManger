import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    senderId: mongoose.Types.ObjectId;
    organizationId: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
            index: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000,
        },
    },
    { timestamps: true }
);

// Index for fetching latest messages
MessageSchema.index({ createdAt: -1 });

export const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);
