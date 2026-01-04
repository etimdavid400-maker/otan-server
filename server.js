import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

/* -------------------- CORS (VERCEL SAFE) -------------------- */
app.use(
  cors({
    origin: [
      "https://wind-ebon.vercel.app", // production frontend
      "http://localhost:5173",        // local dev
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

/* -------------------- Middleware -------------------- */
app.use(express.json());

/* -------------------- Static Files -------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// If you serve images like /public/blog-images/xxx.jpg
app.use("/public", express.static(path.join(__dirname, "public")));

/* -------------------- Database -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* -------------------- Routes -------------------- */
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

/* -------------------- Health Check -------------------- */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "OTAN backend is running 🚀",
  });
});

/* -------------------- IMPORTANT FOR VERCEL -------------------- */
/* ❌ DO NOT use app.listen() */
/* ✅ Export app */

export default app;
