import User from "../models/userModel.js";

// Create a new user in MongoDB after Firebase signup
export const createUser = async (req, res) => {
  try {
    const { uid, name, email } = req.body;

    if (!uid || !name || !email) {
      return res.status(400).json({ message: "UID, name, and email are required" });
    }

    // Check if user already exists
    const existingUser = await User.findById(uid);
    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    const newUser = await User.create({
      _id: uid,
      name,
      email,
      role: "user",
      blocked: false,
      blogsCount: 0,
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
