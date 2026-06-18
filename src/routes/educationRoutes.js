import { Router } from "express";
import * as educationController from "../controllers/educationController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = Router();

// Public routes
router.get("/", educationController.getEducationData);

// Admin-only CRUD
router.post("/", verifyToken, isAdmin, educationController.createEducation);
router.put("/:id", verifyToken, isAdmin, educationController.updateEducation);
router.delete("/:id", verifyToken, isAdmin, educationController.deleteEducation);

export default router;
