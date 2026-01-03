import User from "../models/userModel.js";
import { getAuth } from "firebase-admin/auth";

/**
 * Promote a user to admin
 * Only superadmin can do this
 */
export const promoteToAdmin = async (req, res) => {
  try {
    const { targetUid } = req.body;

    if (!targetUid) return res.status(400).json({ message: "targetUid is required" });

    const user = await User.findById(targetUid);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.json({ message: "User promoted to admin successfully", user });
  } catch (err) {
    console.error("Promote user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete a user
 * Removes from Firebase Auth AND MongoDB
 * Only superadmin can do this
 */
export const deleteUser = async (req, res) => {
  try {
    const { targetUid } = req.body;

    if (!targetUid) return res.status(400).json({ message: "targetUid is required" });

    // Delete from Firebase Auth
    await getAuth().deleteUser(targetUid);

    // Delete from MongoDB
    await User.findByIdAndDelete(targetUid);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * List all users
 * Only superadmin can do this
 */
export const listUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("List users error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
