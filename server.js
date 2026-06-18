import app from "./src/app.js";
import db from "./src/config/db.js";
import { bootstrapAdmin } from "./src/services/authService.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // 1. Test database connection
    console.log("Verifying database connection pool...");
    if (db.readyState !== 1) {
      await new Promise((resolve, reject) => {
        db.once("connected", resolve);
        db.once("error", reject);
      });
    }
    
    // 2. Bootstrap default admin account if necessary
    await bootstrapAdmin();

    // 3. Start listening
    app.listen(PORT, () => {
      console.log(`=========================================`);
      console.log(`PORTFOLIO SERVER RUNNING ON PORT ${PORT}`);
      console.log(`Database: MongoDB via Mongoose`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`Server Date: ${new Date().toISOString()}`);
      console.log(`=========================================`);
    });
  } catch (error) {
    console.error("Critical: Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

export default app;
