import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import blogRoutes from "./routes/blogRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Log every request
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is alive!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
