

import { Types } from "mongoose";


export type TParticipantSide = "support" | "oppose";

export interface IParticipant {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  debate: Types.ObjectId;
  side: TParticipantSide;
  createdAt: Date;
  updatedAt: Date;
}
