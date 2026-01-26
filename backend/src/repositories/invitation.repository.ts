import { InvitationModel, IInvitation, InvitationStatus } from "../models/invitation.model";

export const createInvitation = async (data: {
    email: string;
    organizationId: string;
    inviterId: string;
    token: string;
    expiresAt: Date;
}): Promise<IInvitation> => {
    return InvitationModel.create(data);
};

export const findInvitationByToken = async (
    token: string
): Promise<IInvitation | null> => {
    return InvitationModel.findOne({ token, status: InvitationStatus.PENDING }).exec();
};

export const updateInvitationStatus = async (
    id: string,
    status: InvitationStatus
): Promise<IInvitation | null> => {
    return InvitationModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
};

export const findInvitationsByOrg = async (
    organizationId: string
): Promise<IInvitation[]> => {
    return InvitationModel.find({ organizationId }).sort({ createdAt: -1 }).exec();
};
