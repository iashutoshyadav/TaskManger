import * as repo from "../repositories/invitation.repository";
import { findUserById, findUserByEmail } from "../repositories/user.repository";
import { updateTasksOrganization } from "../repositories/task.repository";
import { findOrganizationById, createOrganization } from "../repositories/organization.repository";
import { notifyWorkspaceInvitation } from "./notification.service";
import { ApiError } from "../utils/ApiError";
import crypto from "crypto";

export const createInvitation = async (email: string, inviterId: string) => {
    let inviter = await findUserById(inviterId);
    if (!inviter) throw ApiError.notFound("User not found");
    if (!inviter.organizationId) {
        const orgName = `${inviter.name}'s Workspace`;
        const slug = `${inviter.name.toLowerCase().replace(/ /g, "-")}-${Date.now()}`;
        const organization = await createOrganization({
            name: orgName,
            slug,
            creatorId: inviter._id.toString()
        });
        inviter.organizationId = organization._id as any;
        inviter.userType = "INDIVIDUAL";
        await inviter.save();
        inviter = (await findUserById(inviterId))!;
    }
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    const invitation = await repo.createInvitation({
        email,
        organizationId: inviter.organizationId!.toString(),
        inviterId,
        token,
        expiresAt,
    });
    const existingUser = await findUserByEmail(email);
    if (existingUser && inviter.organizationId) {
        const org = await findOrganizationById(inviter.organizationId.toString());
        await notifyWorkspaceInvitation(
            existingUser._id.toString(),
            inviter.name,
            org?.name || "Workspace",
            invitation._id.toString(),
            invitation.token
        );
    }
    return invitation;
};

export const verifyInvitation = async (token: string) => {
    const invitation = await repo.findInvitationByToken(token);
    if (!invitation) {
        throw ApiError.notFound("Invitation not found or already accepted");
    }
    if (new Date() > invitation.expiresAt) {
        throw ApiError.badRequest("Invitation has expired");
    }
    return invitation;
};

export const acceptInvitation = async (token: string, userId: string) => {
    const invitation = await verifyInvitation(token);
    const user = await findUserById(userId);
    if (!user) throw ApiError.notFound("User not found");
    const oldOrgId = user.organizationId ? user.organizationId.toString() : null;
    if (invitation.organizationId) {
        await updateTasksOrganization(
            user._id.toString(),
            oldOrgId,
            invitation.organizationId.toString()
        );
    }
    user.organizationId = invitation.organizationId;
    user.userType = "BUSINESS";
    await user.save();
    await repo.updateInvitationStatus(
        invitation._id.toString(),
        "ACCEPTED" as any
    );
    return user;
};
