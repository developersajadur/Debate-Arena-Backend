import { Schema, model, Document } from "mongoose";
import { IArgument } from "./argument.interface";

const argumentSchema = new Schema<IArgument & Document>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"] },
    debate: { type: Schema.Types.ObjectId, ref: "Debate", required: [true, "Debate is required"] },
    side: { type: String, enum: ["support", "oppose"], required: [true, "Side is required"] },
    content: { type: String, required: [true, "Content is required"] },
    voteCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ArgumentModel = model<IArgument & Document>("Argument", argumentSchema);
