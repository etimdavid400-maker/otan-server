import Contact from "../models/contactModel.js";

// GET all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 }); // latest first
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST new message
export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const newMessage = await Contact.create({ name, email, message });
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error creating message:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE message
export const deleteMessage = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Message not found" });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PATCH toggle read/unread
export const toggleReadMessage = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: req.body.read },
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: "Message not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error toggling read status:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
