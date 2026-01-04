import express from "express";
import { createBlog, getBlogs, deleteBlog } from "../controllers/blogController.js";

const router = express.Router();

// GET all blogs
router.get("/", getBlogs);

// POST new blog
router.post("/", createBlog);

// DELETE blog
router.delete("/:id", deleteBlog);

export default router;
