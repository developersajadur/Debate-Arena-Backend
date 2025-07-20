import { Schema, model, Document } from "mongoose";
import { IArgument } from "./argument.interface";

const argumentSchema = new Schema<IArgument & Document>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: [true, "author is required"] },
    debate: { type: Schema.Types.ObjectId, ref: "Debate", required: [true, "Debate is required"] },
    content: { type: String, required: [true, "Content is required"] },
    voteCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ArgumentModel = model<IArgument & Document>("Argument", argumentSchema);
