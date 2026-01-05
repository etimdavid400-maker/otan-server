import Blog from "../models/blogModel.js";

// GET all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Blog fetch error:", err); // log full error
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, link, selectedImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const imageUrl = selectedImage
      ? selectedImage.replace(/^\/+/, "")
      : "";

    const blog = await Blog.create({
      title,
      content,
      link: link || "",
      image: imageUrl,
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.error("Blog create error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE blog
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this blog?")) return;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
      method: "DELETE",
    });
    const data = await res.json(); // get server message
    if (!res.ok) throw new Error(data.message || "Failed to delete blog");

    setBlogs(blogs.filter((b) => b._id !== id)); // Remove from state
    setMessage(data.message || "Blog deleted successfully!");
    setError(""); // clear any previous error
  } catch (err) {
    console.error(err);
    setError(err.message || "Failed to delete blog.");
    setMessage(""); // clear any previous success message
  }
};
