import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  console.error("CRITICAL: MONGODB_URI is not set in environment variables.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(connectionString);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database connected successfully to MongoDB via Mongoose.");
});

db.on("error", (err) => {
  console.error("Unexpected error on MongoDB connection:", err);
});

export default db;
