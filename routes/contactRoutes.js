import express from "express";
import Contact from "../models/contactModel.js";

const router = express.Router();

// GET all contact messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a message
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH (mark as read/unread)
router.patch("/:id", async (req, res) => {
  try {
    const { read } = req.body;
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { read },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; // ✅ THIS LINE IS CRUCIAL
