import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import {
  login,
  register,
  logout,
  getMe,
  updateProfile,
} from "@/api/auth.api";
import {
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  User,
} from "@/types/user";

type UseAuthOptions = {
  enabled?: boolean;
};

export const useAuth = ({ enabled = false }: UseAuthOptions = {}) => {
  const location = useLocation();

  // 🚫 HARD STOP on public routes (FINAL FIX)
  const isPublicRoute =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const shouldFetchMe = enabled && !isPublicRoute;

  /* ---------- CURRENT USER ---------- */
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: shouldFetchMe, // ✅ GUARANTEED SAFE
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const user: User | null = data?.user ?? null;

  /* ---------- LOGIN ---------- */
  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  /* ---------- REGISTER ---------- */
  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
  });

  /* ---------- LOGOUT ---------- */
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear(); // 🔥 clean slate
    },
  });

  /* ---------- UPDATE PROFILE ---------- */
  const updateProfileMutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  return {
    user,
    isAuthenticated: Boolean(user),
    loading: isLoading,

    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    updateProfile: updateProfileMutation.mutateAsync,
  };
};
