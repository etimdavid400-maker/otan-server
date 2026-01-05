import express from "express";
import {
  createBlog,
  getBlogs,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

/* -------------------- VALID ROUTES -------------------- */
router.get("/", getBlogs);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);

// Catch-all removed to prevent path-to-regexp errors

export default router;
