import { OrganizationModel, IOrganization } from "../models/organization.model";

export const createOrganization = async (data: {
    name: string;
    slug: string;
    creatorId: string;
}): Promise<IOrganization> => {
    return OrganizationModel.create(data);
};

export const findOrganizationById = async (
    id: string
): Promise<IOrganization | null> => {
    return OrganizationModel.findById(id).exec();
};

export const findOrganizationBySlug = async (
    slug: string
): Promise<IOrganization | null> => {
    return OrganizationModel.findOne({ slug }).exec();
};
