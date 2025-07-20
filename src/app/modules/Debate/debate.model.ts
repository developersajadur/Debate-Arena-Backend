import { Schema, model } from "mongoose";
import { IDebate } from "./debate.interface";

const debateSchema = new Schema<IDebate>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  category: { type: String, required: true },
  bannerUrl: { type: String },
  duration: { type: Number, required: true }, // duration in hours
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: [true, "CreatedBy is required"] },
  status: { type: String, enum: ["open", "closed"], required: true },
  endsAt: { type: Date },
  winner: { type: String, enum: ["support", "oppose", null], default: null },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const DebateModel = model<IDebate>("Debate", debateSchema);
