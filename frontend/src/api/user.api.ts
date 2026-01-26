import api from "@/lib/api";

export interface User {
    _id: string;
    name: string;
    email: string;
}

export const getUsers = async (): Promise<User[]> => {
    const { data } = await api.get<User[]>("/users");
    return data;
};
