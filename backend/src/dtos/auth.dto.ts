import { z } from "zod";

export const RegisterDto = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "MEMBER", "GUEST"]).optional(),
  organizationName: z.string().trim().min(2).max(100).optional(),
  inviteToken: z.string().optional(),
});

export const LoginDto = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export type RegisterInput = z.infer<typeof RegisterDto>;
export type LoginInput = z.infer<typeof LoginDto>;
