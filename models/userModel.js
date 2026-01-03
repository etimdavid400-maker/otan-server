import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: String, // use Firebase UID as _id
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "superadmin"], default: "user" },
    blocked: { type: Boolean, default: false },
    blogsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
