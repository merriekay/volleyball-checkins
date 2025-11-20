import mongoose from "mongoose";

const checkInSchema = new mongoose.Schema(
  {
    athleteName: {
      type: String,
      required: true,
    },
    emotion: {
      type: String,
      required: true,
      enum: ["stressed", "anxious", "neutral", "happy", "excited"],
    },
    intensity: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CheckIn", checkInSchema);
