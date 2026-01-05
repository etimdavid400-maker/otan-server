import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- Blog Schema ---
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  link: String,
  image: String,
});

const Blog = mongoose.model("Blog", blogSchema);

// --- Contact Schema ---
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// ----------------------
// DEBUG /api/blogs
app.get("/api/blogs", async (req, res) => {
  try {
    console.log("🔹 GET /api/blogs called");
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    console.error("❌ /api/blogs error:", error);
    res.status(500).json({ error: "Failed to fetch blogs", details: error.message });
  }
});

// ----------------------
// DEBUG /api/contact
app.get("/api/contact", async (req, res) => {
  try {
    console.log("🔹 GET /api/contact called");
    const messages = await Contact.find({});
    res.json(messages);
  } catch (error) {
    console.error("❌ /api/contact error:", error);
    res.status(500).json({ error: "Failed to fetch contacts", details: error.message });
  }
});

// ----------------------
// Minimal test route
app.get("/api/test", (req, res) => {
  console.log("🔹 GET /api/test called");
  res.json({ message: "Server is alive!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
