import express from "express";
import { connectDB } from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

/* -------------------- APP FACTORY -------------------- */
const createApp = async () => {
  const app = express();

  /* -------------------- BODY PARSER -------------------- */
  app.use(express.json());

  /* -------------------- CORS -------------------- */
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

  /* -------------------- ROUTES -------------------- */
  app.use("/api/contact", contactRoutes);
  app.use("/api/blogs", blogRoutes);

  /* -------------------- TEST ROUTE -------------------- */
  app.get("/api/test", (req, res) => {
    console.log("✅ Test route hit");
    res.json({ success: true, message: "OTAN backend running 🚀" });
  });

  return app;
};

/* -------------------- VERCEL SERVERLESS EXPORT -------------------- */
let cachedApp = null;

export default async function handler(req, res) {
  try {
    // Connect to MongoDB (cached)
    await connectDB(process.env.MONGO_URI);

    // Initialize app once
    if (!cachedApp) {
      cachedApp = await createApp();
    }

    cachedApp(req, res); // Pass request to Express
  } catch (error) {
    console.error("❌ Serverless function error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
