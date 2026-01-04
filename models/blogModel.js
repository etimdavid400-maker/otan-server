import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String, default: "" },
    image: { type: String, default: "" }, // FULL URL
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
