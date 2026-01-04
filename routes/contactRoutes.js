import express from "express";
import { getMessages, createMessage } from "../controllers/contactController.js";

const router = express.Router();

// GET all contact messages
router.get("/", getMessages);

// POST new message
router.post("/", createMessage);

export default router;
