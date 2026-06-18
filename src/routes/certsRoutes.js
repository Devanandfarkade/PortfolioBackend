import { Router } from "express";
import * as certsController from "../controllers/certsController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = Router();

// Public routes
router.get("/", certsController.getCertificationsData);

// Admin-only CRUD
router.post("/", verifyToken, isAdmin, certsController.createCertification);
router.put("/:id", verifyToken, isAdmin, certsController.updateCertification);
router.delete("/:id", verifyToken, isAdmin, certsController.deleteCertification);

export default router;
