// server/controllers/blogController.js
import Blog from "../models/blogModel.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, link, selectedImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Use the selectedImage from the admin or default image
    const blog = await Blog.create({
      title,
      content,
      link: link || "",
      image: selectedImage || "/blog-images/image1.jpg",
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.error("Blog create error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
