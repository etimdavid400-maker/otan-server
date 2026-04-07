import Blog from "../models/blogModel.js";
import { connectToDB } from "../server.js";

/* -------------------- GET BLOGS -------------------- */
export const getBlogs = async (req, res) => {
  try {
    await connectToDB(); // ✅ Connect before querying

    const blogs = await Blog.find({}, "-image").sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    console.error("❌ Error getting blogs:", error.message);
    res.status(500).json({ message: "Failed to get blogs", error: error.message });
  }
};

/* -------------------- CREATE BLOG -------------------- */
export const createBlog = async (req, res) => {
  try {
    await connectToDB(); // ✅ Connect before querying

    const { title, content, link } = req.body;
    const newBlog = await Blog.create({ title, content, link });

    res.status(201).json(newBlog);
  } catch (error) {
    console.error("❌ Error creating blog:", error.message);
    res.status(500).json({ message: "Failed to create blog", error: error.message });
  }
};

/* -------------------- DELETE BLOG -------------------- */
export const deleteBlog = async (req, res) => {
  try {
    await connectToDB(); // ✅ Connect before querying

    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    console.error("❌ Error deleting blog:", error.message);
    res.status(500).json({ message: "Failed to delete blog", error: error.message });
  }
};