import api from "@/lib/api";

export interface Invitation {
    _id: string;
    email: string;
    organizationId: string;
    token: string;
    status: "PENDING" | "ACCEPTED" | "EXPIRED";
    expiresAt: string;
}

export const createInvitation = async (email: string): Promise<{ invitation: Invitation }> => {
    const { data } = await api.post("/invitations", { email });
    return data;
};

export const verifyInvitation = async (token: string): Promise<{ invitation: Invitation }> => {
    const { data } = await api.get(`/invitations/${token}`);
    return data;
};

export const acceptInvitation = async (token: string): Promise<{ message: string; user: any }> => {
    const { data } = await api.post("/invitations/accept", { token });
    return data;
};
