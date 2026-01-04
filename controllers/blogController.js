import Blog from "../models/blogModel.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, link, selectedImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Only store the path relative to the public folder
    const imagePath = selectedImage ? `blog-images/${selectedImage}` : "blog-images/default.jpg";

    const blog = await Blog.create({
      title,
      content,
      link: link || "",
      image: imagePath,
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

    // For frontend convenience, prepend `/` to image paths
    const blogsWithFullPath = blogs.map((b) => ({
      ...b._doc,
      imageUrl: `/${b.image}`, 
    }));

    res.json(blogsWithFullPath);
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
