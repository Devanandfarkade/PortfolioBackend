import { Router } from "express";
import * as messagesController from "../controllers/messagesController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = Router();

// Public route to submit message
router.post("/", messagesController.sendMessage);

// Admin routes for managing inbox
router.get("/", verifyToken, isAdmin, messagesController.getMessages);
router.put("/:id", verifyToken, isAdmin, messagesController.updateMessageStatus);
router.delete("/:id", verifyToken, isAdmin, messagesController.deleteMessage);

export default router;
