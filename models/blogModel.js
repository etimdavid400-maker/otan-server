import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String },
    image: { type: String }, // full URL
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
