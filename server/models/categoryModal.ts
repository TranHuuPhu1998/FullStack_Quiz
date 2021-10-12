import mongoose from "mongoose";
import { ICategory } from "../config/interface";

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Please add user"],
    },
    name: {
      type : String,
      required: [true, "Please add your name"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>("category", categorySchema);
