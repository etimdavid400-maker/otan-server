import express from "express";
import { createBlog, getBlogs, deleteBlog } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);

export default router;
