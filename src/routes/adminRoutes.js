import { Router } from "express";
import * as adminController from "../controllers/adminController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = Router();

// Admin stats endpoint
router.get("/stats", verifyToken, isAdmin, adminController.getStats);

export default router;
