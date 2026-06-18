import { Router } from "express";
import * as experienceController from "../controllers/experienceController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = Router();

// Public routes
router.get("/", experienceController.getExperienceData);

// Admin-only CRUD
router.post("/", verifyToken, isAdmin, experienceController.createExperience);
router.put("/:id", verifyToken, isAdmin, experienceController.updateExperience);
router.delete("/:id", verifyToken, isAdmin, experienceController.deleteExperience);

export default router;
