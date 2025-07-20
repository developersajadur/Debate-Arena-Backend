import { Types } from "mongoose";


export interface IArgument {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  debate: Types.ObjectId;
  content: string;
  voteCount: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
