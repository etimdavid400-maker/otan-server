import express from "express";
import {
  getMessages,
  createMessage,
  deleteMessage,
  toggleReadMessage,
} from "../controllers/contactController.js";

const router = express.Router();

router.get("/", getMessages);
router.post("/", createMessage);
router.delete("/:id", deleteMessage);
router.patch("/:id", toggleReadMessage);

export default router;
