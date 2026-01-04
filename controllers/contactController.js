// controllers/contactController.js
import Contact from "../models/contactModel.js";

export const getMessages = async (req, res) => {
  try {
    // Fetch all messages from MongoDB
    const messages = await Contact.find({}); 

    // Ensure we always send an array
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json([]); // send empty array instead of crashing frontend
  }
};

// DELETE a message by ID
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Message not found" });

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH: toggle read/unread status
export const toggleReadMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    const updated = await Contact.findByIdAndUpdate(
      id,
      { read },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Message not found" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating message:", err);
    res.status(500).json({ message: "Server error" });
  }
};
