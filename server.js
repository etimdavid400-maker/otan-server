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

/* -------------------- CORS Setup -------------------- */
const allowedOrigins = [
  "https://wind-ebon.vercel.app", // deployed frontend
  "http://localhost:5173",        // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


/* -------------------- Middleware -------------------- */
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
  res.status(200).json({
    success: true,
    message: "OTAN backend is running 🚀",
  });
});

/* -------------------- IMPORTANT -------------------- */
/* ❌ DO NOT use app.listen() on Vercel */
/* ✅ Export the app instead */

export default app;
