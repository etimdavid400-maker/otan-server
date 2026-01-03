import express from "express";
import { promoteToAdmin, deleteUser, listUsers } from "../controllers/adminController.js";

const router = express.Router();

// Superadmin actions
router.post("/promote", promoteToAdmin); // Promote user to admin
router.post("/delete", deleteUser);      // Delete user
router.get("/list", listUsers);          // Get all users

export default router;
