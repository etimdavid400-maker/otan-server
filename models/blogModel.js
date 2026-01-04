import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String }, // external link
    image: { type: String, required: true }, // local public image
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
