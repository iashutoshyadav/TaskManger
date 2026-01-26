import { UserModel, IUser, UserRole } from "../models/user.model";

type CreateUserData = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export const createUser = async (
  data: CreateUserData
): Promise<IUser> => {
  return UserModel.create(data);
};

export const findUserByEmail = async (
  email: string,
  withPassword = false
): Promise<IUser | null> => {
  const query = UserModel.findOne({ email });
  if (withPassword) query.select("+password");
  return query.exec();
};

export const findUserById = async (
  id: string
): Promise<IUser | null> => {
  return UserModel.findById(id).exec();
};

export const updateUserById = async (
  id: string,
  data: Partial<Pick<IUser, "name" | "role">>
): Promise<IUser | null> => {
  return UserModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).exec();
};

export const findAllUsers = async (
  organizationId: string
): Promise<IUser[]> => {
  return UserModel.find({ organizationId }).select("name email _id organizationId").exec();
};
