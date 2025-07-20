import { Schema, model, Document } from "mongoose";
import { IArgument } from "./argument.interface";

const voteInfoSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    votedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const argumentSchema = new Schema<IArgument & Document>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    debate: { type: Schema.Types.ObjectId, ref: "Debate", required: true },
    content: { type: String, required: true },
    votes: { type: [voteInfoSchema], default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ArgumentModel = model<IArgument & Document>("Argument", argumentSchema);
