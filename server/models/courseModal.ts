import mongoose from "mongoose";
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const courseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    imageBanner: {
      type: String,
      required: [true, "Please add your image Banner"],
    },
    createBy: {
      type: String,
      required: [true, "Please add your createBy"],
    },
    name: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
    },
    categoryId: {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    released: {
      type: Boolean,
    },
    descriptions: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
courseSchema.plugin(aggregatePaginate);

export default mongoose.model("course", courseSchema);
