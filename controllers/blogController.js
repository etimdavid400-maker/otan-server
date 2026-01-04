import Blog from "../models/blogModel.js";

/* -------------------- CREATE BLOG -------------------- */
export const createBlog = async (req, res) => {
  try {
    const { title, content, link, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      link: link || "",
      image: image || "", // MUST be full URL
    });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (err) {
    console.error("❌ Create blog error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
    });
  }
};

/* -------------------- GET BLOGS -------------------- */
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs || []);
  } catch (err) {
    console.error("❌ Get blogs error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};

/* -------------------- DELETE BLOG -------------------- */
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Blog deleted",
    });
  } catch (err) {
    console.error("❌ Delete blog error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
};
