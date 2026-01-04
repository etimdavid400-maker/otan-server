import Contact from "../models/contactModel.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find({});
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export const toggleRead = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: req.body.read },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
