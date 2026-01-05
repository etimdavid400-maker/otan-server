import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: ["https://wind-ebon.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json());

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static public folder
app.use("/public", express.static(path.join(__dirname, "public")));

// -----------------------------
// MongoDB connection (Vercel-friendly)
// -----------------------------
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Connect once at startup
connectToDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -----------------------------
// Routes
// -----------------------------
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

// Test endpoint
app.get("/", (req, res) =>
  res.json({ success: true, message: "OTAN backend running 🚀" })
);

export default app;