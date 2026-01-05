import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();

// -------------------- CORS --------------------
const allowedOrigins = [
  "http://localhost:5173",          // Local development
  "https://wind-ebon.vercel.app"   // Production frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// -------------------- BODY PARSER --------------------
app.use(express.json());

// -------------------- MONGO DB CONNECTION --------------------
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

connectToDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -------------------- ROUTES --------------------
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

// -------------------- TEST ENDPOINT --------------------
app.get("/", (req, res) =>
  res.json({ success: true, message: "OTAN backend running 🚀" })
);

export default app;
