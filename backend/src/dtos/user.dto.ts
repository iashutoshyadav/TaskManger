import { z } from "zod";

export const RegisterUserDto = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "MEMBER", "GUEST"]).optional(),
});

export const UpdateUserProfileDto = z.object({
  name: z.string().min(2).max(50).optional(),
  role: z.enum(["ADMIN", "MEMBER", "GUEST"]).optional(),
});

export type UpdateUserProfileInput = z.infer<typeof UpdateUserProfileDto>;
