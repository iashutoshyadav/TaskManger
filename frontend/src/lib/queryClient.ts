import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 30 seconds
      gcTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: (failureCount, error: any) => {
        // Do not retry on auth errors
        if (error?.response?.status === 401) return false;
        return failureCount < 2;
      }
    },
    mutations: {
      retry: false
    }
  }
});
