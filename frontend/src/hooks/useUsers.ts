import { useQuery } from "@tanstack/react-query";
import { getUsers, User } from "@/api/user.api";

export const useUsers = () => {
    return useQuery<User[], Error>({
        queryKey: ["users"],
        queryFn: getUsers,
    });
};
