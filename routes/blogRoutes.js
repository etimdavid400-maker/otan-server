import express from "express";
import {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog
} from "../controllers/blogController.js";

const router = express.Router();

/* -------------------- VALID ROUTES -------------------- */
router.get("/", getBlogs);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog); // ✅ KEEP THIS

// Catch-all removed to prevent path-to-regexp errors

export default router;
