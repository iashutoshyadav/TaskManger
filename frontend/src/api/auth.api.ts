import api from "@/lib/api";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
} from "@/types/user";

/* ---------- AUTH ---------- */

export const login = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(
    "/auth/login",
    payload
  );
  return data;
};

export const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(
    "/auth/register",
    payload
  );
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getMe = async (): Promise<AuthResponse | null> => {
  try {
    const { data } = await api.get<AuthResponse>("/auth/me");
    return data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      return null;
    }
    throw err;
  }
};

export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<AuthResponse> => {
  const { data } = await api.put<AuthResponse>(
    "/auth/profile",
    payload
  );
  return data;
};
