import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String },        // external link (optional)
    image: { type: String },       // URL to public image or Firebase (future)
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
