import { Types } from "mongoose";

export type TArgumentSide = "support" | "oppose";


export interface IArgument {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  debate: Types.ObjectId;
  side: TArgumentSide;
  content: string;
  voteCount: number;
  createdAt: Date;
  updatedAt: Date;
}
