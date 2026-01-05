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

/* -------------------- CATCH ALL INVALID METHODS -------------------- */
router.all("/:path*", (req, res) => {
  res.status(405).json({
    message: "Invalid method or route for /api/blogs",
    method: req.method,
    path: req.originalUrl
  });
});

export default router;
