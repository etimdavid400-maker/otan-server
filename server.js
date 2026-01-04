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

/* -------------------- CORS -------------------- */
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

/* -------------------- Middleware -------------------- */
app.use(express.json());

/* -------------------- Static Files -------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve images from /public
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

/* -------------------- Global Error Handler -------------------- */
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({ success: false, message: err.message });
});

/* -------------------- Export app for Vercel -------------------- */
export default app;
