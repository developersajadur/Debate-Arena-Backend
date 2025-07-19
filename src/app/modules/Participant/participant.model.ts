import { Schema, model, Document } from "mongoose";
import { IParticipant } from "./participant.interface";

const participantSchema = new Schema<IParticipant & Document>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"] },
    debate: { type: Schema.Types.ObjectId, ref: "Debate", required: [true, "Debate is required"] },
    side: { type: String, enum: ["support", "oppose"], required: [true, "Side is required"] },
  },
  { timestamps: true }
);

participantSchema.index({ user: 1, debate: 1 }, { unique: true });

export const ParticipantModel = model<IParticipant & Document>("Participant", participantSchema);
