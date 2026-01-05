import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();

// -------------------- CORS --------------------
// Restrict to specific frontend URLs
const allowedOrigins = [
  "https://wind-ebon.vercel.app",
  "http://localhost:5173"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    return res.sendStatus(200);
  }
  next();
});

// -------------------- Logging --------------------
app.use(morgan("dev")); // logs all requests in the console

// -------------------- Body Parser --------------------
app.use(express.json());

// -------------------- Static Files --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/public", express.static(path.join(__dirname, "public")));

// -------------------- MongoDB --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -------------------- Routes --------------------
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

// -------------------- Test Endpoint --------------------
app.get("/", (req, res) =>
  res.json({ success: true, message: "OTAN backend running 🚀" })
);

// -------------------- Global Error Handler --------------------
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? undefined : err.message
  });
});

export default app;
