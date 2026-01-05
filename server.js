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

/* -------------------- CORS -------------------- */
app.use(
  cors({
    origin: ["https://wind-ebon.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* -------------------- BODY PARSER -------------------- */
app.use(express.json());

/* -------------------- __dirname fix for ES modules -------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* -------------------- STATIC FILES -------------------- */
// Serve static /public folder inside server/
app.use("/public", express.static(path.join(__dirname, "public")));

/* -------------------- MONGODB CONNECTION (CACHED) -------------------- */
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
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/* -------------------- ROUTES -------------------- */
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

/* -------------------- TEST ENDPOINT -------------------- */
app.get("/", (req, res) =>
  res.json({ success: true, message: "OTAN backend running 🚀" })
);

/* -------------------- VERCEL SERVERLESS HANDLER -------------------- */
export default async function handler(req, res) {
  try {
    await connectToDB(); // ensure DB connected per request
    app(req, res); // pass request to Express
  } catch (err) {
    console.error("❌ Serverless function error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
