import * as repo from "../repositories/message.repository";
import { IMessage } from "../models/message.model";

export const saveMessage = async (
    senderId: string,
    organizationId: string,
    content: string
): Promise<IMessage> => {
    return repo.createMessage(senderId, organizationId, content);
};

export const getRecentMessages = async (organizationId: string, limit: number = 50) => {
    const messages = await repo.getLatestMessages(organizationId, limit);
    // Reverse to show oldest first (history style)
    return messages.reverse();
};
