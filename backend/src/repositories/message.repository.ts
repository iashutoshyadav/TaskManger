import { MessageModel, IMessage } from "../models/message.model";

export const createMessage = async (
    senderId: string,
    organizationId: string,
    content: string
): Promise<IMessage> => {
    return MessageModel.create({ senderId, organizationId, content });
};

export const getLatestMessages = async (
    organizationId: string,
    limit: number = 50
): Promise<IMessage[]> => {
    return MessageModel.find({ organizationId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("senderId", "name email")
        .exec();
};
