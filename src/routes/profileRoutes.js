import { Router } from "express";
import * as profileController from "../controllers/profileController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = Router();

// Public routes
router.get("/", profileController.getProfile);

// Admin-only routes
router.put("/", verifyToken, isAdmin, profileController.updateProfile);
router.post("/resume", verifyToken, isAdmin, upload.single("resume"), profileController.uploadResume);

// Roles CRUD
router.post("/roles", verifyToken, isAdmin, profileController.addRole);
router.put("/roles/:id", verifyToken, isAdmin, profileController.updateRole);
router.delete("/roles/:id", verifyToken, isAdmin, profileController.deleteRole);

// Stats CRUD
router.post("/stats", verifyToken, isAdmin, profileController.addStat);
router.put("/stats/:id", verifyToken, isAdmin, profileController.updateStat);
router.delete("/stats/:id", verifyToken, isAdmin, profileController.deleteStat);

export default router;
