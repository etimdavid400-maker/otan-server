import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- Static Files -------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
  res.status(200).json({ success: true, message: "OTAN backend is running 🚀" });
});

/* -------------------- Export App for Vercel -------------------- */
export default app;
