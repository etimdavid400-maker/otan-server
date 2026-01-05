import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

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

// -----------------------------
// MongoDB connection (Vercel-safe)
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Middleware to ensure DB is connected for every request
app.use(async (req, res, next) => {
  try {
    await connectToDB();
    next();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    return res.status(500).json({ message: "Database connection failed", error: err.message });
  }
});

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.json({ success: true, message: "OTAN backend running 🚀" });
});

export default app;
