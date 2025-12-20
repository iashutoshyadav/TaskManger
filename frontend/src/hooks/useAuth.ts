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

  const isPublicRoute =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const shouldFetchMe = enabled && !isPublicRoute;

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: shouldFetchMe,
    retry: false,
    staleTime: Infinity,
  });

  const user: User | null = data?.user ?? null;

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });

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
