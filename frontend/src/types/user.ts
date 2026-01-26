export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MEMBER" | "GUEST";
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  organizationName?: string;
  inviteToken?: string;
}

export interface UpdateProfilePayload {
  name: string;
}
