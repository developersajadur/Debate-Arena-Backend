import status from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { UserModel } from './user.model';
import config from '../../config';

const CreateUser = async (
  payload: Partial<IUser>
): Promise<IUser> => {
  const existing = await UserModel.findOne({ email: payload.email });
  if (existing) {
    throw new AppError(status.CONFLICT, 'Email already in use');
  }

  const user = await UserModel.create({
    ...payload,
    role: 'user',
  });

  return user;
};



const seedAdmin = async () => {
  const existingAdmin = await UserModel.findOne({ role: 'admin' });

  if (existingAdmin) {
    throw new AppError(status.CONFLICT, 'Admin already exists');
  }
  const admin = await UserModel.create({
    name: 'Admin',
    email: config.default_admin_email,
    phone: config.default_admin_phone,
    password: config.default_admin_password,
    role: 'admin',
    isDeleted: false,
    isBlocked: false,
  });

  return admin;
};

export const userService = {
  CreateUser,
  seedAdmin,
};
