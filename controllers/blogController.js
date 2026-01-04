import Blog from "../models/blogModel.js";

/* -------------------- Create Blog -------------------- */
export const createBlog = async (req, res) => {
  try {
    const { title, content, link, selectedImage } = req.body;

    if (!title || !content || !selectedImage) {
      return res.status(400).json({ message: "Title, content, and image are required" });
    }

    // Ensure selectedImage is a valid option from public folder
    const allowedImages = [
      "/public/image1.jpg",
      "/public/image2.jpg",
      "/public/image3.jpg",
      "/public/image4.jpg",
      "/public/image5.jpg",
    ];

    if (!allowedImages.includes(selectedImage)) {
      return res.status(400).json({ message: "Invalid image selection" });
    }

    const blog = await Blog.create({
      title,
      content,
      link: link || "",
      image: selectedImage,
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.error("Blog create error:", err);
    res.status(500).json({ message: "Server error while creating blog" });
  }
};

/* -------------------- Get All Blogs -------------------- */
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(Array.isArray(blogs) ? blogs : []);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Server error while fetching blogs" });
  }
};

/* -------------------- Delete Blog -------------------- */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ message: "Server error while deleting blog" });
  }
};
