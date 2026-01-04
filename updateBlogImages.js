import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/* -------------------- CONNECT TO DB -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* -------------------- FLEXIBLE BLOG MODEL -------------------- */
const blogSchema = new mongoose.Schema({}, { strict: false });
const Blog = mongoose.model("Blog", blogSchema);

/* -------------------- UPDATE SCRIPT -------------------- */
const updateImages = async () => {
  try {
    const blogs = await Blog.find();

    for (const blog of blogs) {
      if (blog.image && blog.image.startsWith("/public")) {
        const updatedImage = `https://otan-server.vercel.app${blog.image}`;

        await Blog.updateOne(
          { _id: blog._id },
          { $set: { image: updatedImage } }
        );

        console.log(`🖼️ Updated blog ${blog._id}`);
      }
    }

    console.log("✅ All blog images updated successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error updating blogs:", err);
    process.exit(1);
  }
};

updateImages();
k