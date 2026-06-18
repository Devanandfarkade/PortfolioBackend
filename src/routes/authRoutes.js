import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.registerAdmin);
router.post("/forgot-password", authController.forgotPassword);
router.put("/update", verifyToken, authController.updateAccount);
router.get("/me", verifyToken, authController.getProfile);

export default router;
