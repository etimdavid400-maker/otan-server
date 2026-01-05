import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config(); // ✅ Keep this at top

const app = express();

/* -------------------- BODY PARSER -------------------- */
app.use(express.json());

/* -------------------- CORS (YOURS, KEPT) -------------------- */
const allowedOrigins = [
  "https://wind-ebon.vercel.app",
  "http://localhost:5173",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    return res.sendStatus(200);
  }

  next();
});

/* -------------------- REQUEST LOGGING -------------------- */
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

/* -------------------- DB CONNECT (VERCEL SAFE) -------------------- */
try {
  await connectDB(process.env.MONGO_URI);
} catch (error) {
  console.error("❌ Failed to connect to MongoDB:", error.message);
  process.exit(1); // Stop server if DB connection fails
}

/* -------------------- ROUTES -------------------- */
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

/* -------------------- TEST ROUTE -------------------- */
app.get("/api/test", (req, res) => {
  console.log("✅ Test route hit");
  res.json({ success: true, message: "OTAN backend running 🚀" });
});

/* -------------------- EXPORT (NO app.listen) -------------------- */
export default app;
