import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import skillsRoutes from "./routes/skillsRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import certsRoutes from "./routes/certsRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Middleware imports
import errorHandler from "./middleware/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Global Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false // Allows loading static images/PDFs across origins
}));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploads static folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// API Endpoints
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/certs", certsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/admin", adminRoutes);

// Base Status Route
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Antigravity Portfolio Backend API - Online and Secured.",
    version: "1.0.0"
  });
});

// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Centralized error handling
app.use(errorHandler);

export default app;
