import express from "express";
import {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog); // ✅ ADD THIS

export default router;
