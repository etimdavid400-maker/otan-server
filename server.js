import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import blogRoutes from "./routes/blogRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// -------------------- Logger --------------------
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// -------------------- MongoDB --------------------
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGO_URI || process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err));
}

// -------------------- Routes --------------------
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);

// -------------------- Test --------------------
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "OTAN backend running 🚀" });
});

// ❌ NO app.listen()
// ✅ EXPORT for Vercel
export default app;
