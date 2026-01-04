import Blog from "../models/blogModel.js";

// List of predefined public images
const predefinedImages = [
  "/public/image1.jpg",
  "/public/image2.jpg",
  "/public/image3.jpg",
  "/public/image4.jpg",
  "/public/image5.jpg",
];

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, link, selectedImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // If admin selected an image, use it; otherwise default to first predefined image
    const imageToUse = predefinedImages.includes(selectedImage)
      ? selectedImage
      : predefinedImages[0];

    const blog = await Blog.create({
      title,
      content,
      link: link || "",
      image: imageToUse,
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
    console.error("Blog fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error("Blog delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
