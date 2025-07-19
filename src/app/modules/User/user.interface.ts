import { Types } from 'mongoose';
import { TUserRole } from './user.constant';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: TUserRole;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
