import Blog from "../models/blogModel.js";

const FRONTEND_URL = process.env.FRONTEND_URL || "https://wind-ebon.vercel.app";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, link, selectedImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Use selected image from public folder
    // Remove "/public" if admin sent it
    const cleanImage = selectedImage
      ? selectedImage.replace(/^\/?public/, "")
      : "/image1.jpg"; // default

    // Build full URL for production so mobile can load
    const imageUrl = `${FRONTEND_URL}${cleanImage.startsWith("/") ? "" : "/"}${cleanImage}`;

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

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error("Get blogs error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error("Delete blog error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
