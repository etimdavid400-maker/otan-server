import express from "express";
import {
  createBlog,
  getBlogs,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/", createBlog);
router.get("/", getBlogs);
router.delete("/:id", deleteBlog);

export default router;
