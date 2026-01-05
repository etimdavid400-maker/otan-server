import mongoose from "mongoose";
import Blog from "../models/blogModel.js";

const connectToDB = async () => {
  if (mongoose.connection.readyState === 1) return; // already connected
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// GET all blogs
export const getBlogs = async (req, res) => {
  try {
    await connectToDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Blog fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST new blog
export const createBlog = async (req, res) => {
  try {
    await connectToDB();
    const { title, content, link, selectedImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const imageUrl = selectedImage ? selectedImage.replace(/^\/+/, "") : "";

    const blog = await Blog.create({
      title,
      content,
      link: link || "",
      image: imageUrl,
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.error("Blog create error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE blog
export const deleteBlog = async (req, res) => {
  try {
    await connectToDB();
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    console.error("Blog delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
