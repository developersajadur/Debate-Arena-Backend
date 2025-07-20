import { Types } from "mongoose";

export interface IVoteInfo {
  user: Types.ObjectId;
  votedAt: Date;
}

export interface IArgument {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  debate: Types.ObjectId;
  content: string;
  votes: IVoteInfo[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
