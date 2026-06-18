import { Router } from "express";
import * as skillsController from "../controllers/skillsController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = Router();

// Public routes
router.get("/", skillsController.getSkillsData);

// Skills CRUD (Admin-only)
router.post("/", verifyToken, isAdmin, skillsController.createSkill);
router.put("/:id", verifyToken, isAdmin, skillsController.updateSkill);
router.delete("/:id", verifyToken, isAdmin, skillsController.deleteSkill);

// Highlights CRUD (Admin-only)
router.post("/highlights", verifyToken, isAdmin, skillsController.createHighlight);
router.put("/highlights/:id", verifyToken, isAdmin, skillsController.updateHighlight);
router.delete("/highlights/:id", verifyToken, isAdmin, skillsController.deleteHighlight);

export default router;
