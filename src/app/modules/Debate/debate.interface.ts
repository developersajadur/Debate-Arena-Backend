import { Types } from "mongoose";

export type TDebateStatus = "open" | "closed";


export interface IDebate {
  _id: Types.ObjectId;
  title: string;
  description: string;
  tags: string[];
  category: string;
  bannerUrl?: string;
  duration: number;  // duration in hours
  createdBy: Types.ObjectId;
  status: TDebateStatus;
  endsAt?: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
