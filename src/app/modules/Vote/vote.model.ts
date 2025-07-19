import { Schema, model, Document } from "mongoose";
import { IVote } from "./vote.interface";

const voteSchema = new Schema<IVote & Document>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"] },
    argument: { type: Schema.Types.ObjectId, ref: "Argument", required: [true, "Argument is required"] },
  },
  { timestamps: true }
);

voteSchema.index({ user: 1, argument: 1 }, { unique: true });

export const VoteModel = model<IVote & Document>("Vote", voteSchema);
