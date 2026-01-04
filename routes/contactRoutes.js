import express from "express";
import {
  getMessages,
  createMessage,
  deleteMessage,
  toggleReadMessage,
} from "../controllers/contactController.js";

const router = express.Router();

// GET all contact messages
router.get("/", getMessages);

// POST new message
router.post("/", createMessage);

// DELETE a message
router.delete("/:id", deleteMessage);

// PATCH toggle read/unread
router.patch("/:id", toggleReadMessage);

export default router;
