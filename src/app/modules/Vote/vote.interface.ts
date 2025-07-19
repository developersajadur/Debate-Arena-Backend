import { Types } from "mongoose";

export interface IVote {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  argument: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
