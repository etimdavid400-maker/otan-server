import Blog from "../models/blogModel.js";

// -------------------- GET all blogs --------------------
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Blog fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- POST new blog --------------------
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
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- DELETE blog --------------------
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Blog delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- UPDATE blog --------------------
export const updateBlog = async (req, res) => {
  try {
    const { title, content, link, selectedImage } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update only the provided fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (link !== undefined) blog.link = link;
    if (selectedImage) blog.image = selectedImage.replace(/^\/+/, "");

    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (err) {
    console.error("Blog update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// NEW: handle update submit
// -------------------- UPDATE blog --------------------
const handleUpdate = async (id) => {
  setMessage("");
  setError("");

  if (!editTitle || !editContent) {
    return setError("Title and content are required for update.");
  }

  // Prepare data matching backend keys
  const updateData = {
    title: editTitle,
    content: editContent,
    link: editLink,
    // store only relative path, avoid double URLs
    selectedImage: editSelectedImage.replace(`${import.meta.env.VITE_API_URL}/public/`, "")
  };

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData)
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Failed to update blog.");
    } else {
      setMessage("Blog updated successfully!");
      setEditBlogId(null); // exit editing mode
      setEditTitle("");
      setEditContent("");
      setEditLink("");
      setEditSelectedImage(`${import.meta.env.VITE_API_URL}/public/image1.jpg`);

      // Refresh blog list
      fetchBlogs();
    }
  } catch (err) {
    console.error("Blog update error:", err);
    setError("Server error. Try again later.");
  }
};

