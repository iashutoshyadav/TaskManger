import { RegisterInput, LoginInput } from "../dtos/auth.dto";
import { createUser, findUserByEmail } from "../repositories/user.repository";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";
import { IUser, UserRole } from "../models/user.model";
import { createOrganization } from "../repositories/organization.repository";
import { findInvitationByToken, updateInvitationStatus } from "../repositories/invitation.repository";
import { InvitationStatus } from "../models/invitation.model";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

type AuthResponse = {
  user: Omit<IUser, "password">;
  token: string;
};

export const registerUser = async (
  input: RegisterInput
): Promise<AuthResponse> => {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw ApiError.badRequest("Email already exists");
  }

  const hashed = await hashPassword(input.password);

  // Initial creation (will update role below)
  const user = await createUser({
    name: input.name,
    email: input.email,
    password: hashed,
    role: UserRole.MEMBER // Default
  });

  // Handle Organization or Invitation
  if (input.inviteToken) {
    const invitation = await findInvitationByToken(input.inviteToken);
    if (!invitation) {
      throw ApiError.notFound("Invalid or expired invitation");
    }
    if (new Date() > invitation.expiresAt) {
      throw ApiError.badRequest("Invitation has expired");
    }

    user.organizationId = invitation.organizationId;
    user.userType = "BUSINESS";
    await user.save();

    await updateInvitationStatus(invitation._id.toString(), InvitationStatus.ACCEPTED);
  } else {
    const orgName = input.organizationName || `${input.name}'s Workspace`;
    const slug = `${orgName.toLowerCase().replace(/ /g, "-")}-${Date.now()}`;

    const organization = await createOrganization({
      name: orgName,
      slug,
      creatorId: user._id.toString()
    });

    // Update user with organizationId and type
    user.organizationId = organization._id as any;
    user.userType = input.organizationName ? "BUSINESS" : "INDIVIDUAL";
    await user.save();
  }

  const token = signToken(user._id.toString());
  const obj = user.toObject();
  delete obj.password;

  return { user: obj, token };
};

export const loginUser = async (
  input: LoginInput
): Promise<AuthResponse> => {
  const user = await findUserByEmail(input.email, true);
  if (!user || !user.password) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  const ok = await comparePassword(input.password, user.password);
  if (!ok) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  // Auto-promote if in ADMIN_EMAILS (even for existing users)
  const shouldBeAdmin = env.adminEmails.includes(user.email.toLowerCase());
  if (shouldBeAdmin && user.role !== UserRole.ADMIN) {
    user.role = UserRole.ADMIN;
    await user.save();
  }

  const token = signToken(user._id.toString());
  const obj = user.toObject();
  delete obj.password;

  return { user: obj, token };
};
