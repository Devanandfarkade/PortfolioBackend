import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretcyberpunkkeychangeinproduction";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied: No credentials provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Access Denied: Invalid or expired token." });
  }
}

export function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(433).json({ error: "Forbidden: Administrative access required." });
  }
  next();
}
