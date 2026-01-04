import Blog from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, link, selectedImage } = req.body;

    if (!title || !content || !selectedImage) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL not set");
    }

    const imageUrl = `${process.env.BASE_URL}/public/${selectedImage}`;

    const blog = await Blog.create({
      title,
      content,
      link: link || "",
      image: imageUrl,
    });

    res.status(201).json(blog);
  } catch (err) {
    console.error("Create blog error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    const safeBlogs = blogs.map((b) => ({
      ...b._doc,
      image: b.image || "",
    }));

    res.json(safeBlogs);
  } catch (err) {
    console.error("Get blogs error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error("Delete blog error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
