import express from "express";
import {
  createBlog,
  getBlogs,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

// POST new blog
router.post("/", createBlog);

// GET all blogs
router.get("/", getBlogs);

// DELETE blog
router.delete("/:id", deleteBlog);

export default router;
