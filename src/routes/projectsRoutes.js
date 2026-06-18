import { Router } from "express";
import * as projectsController from "../controllers/projectsController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = Router();

// Public routes
router.get("/", projectsController.getProjectsData);

// Admin-only CRUD
router.post("/", verifyToken, isAdmin, projectsController.createProject);
router.put("/:id", verifyToken, isAdmin, projectsController.updateProject);
router.delete("/:id", verifyToken, isAdmin, projectsController.deleteProject);

export default router;
