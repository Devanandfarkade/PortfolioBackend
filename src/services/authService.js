import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretcyberpunkkeychangeinproduction";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export async function loginUser(username, password) {
  const user = await userModel.findByUsername(username);
  if (!user) {
    throw new Error("Invalid username or password.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error("Invalid username or password.");
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  };
}

export async function bootstrapAdmin() {
  try {
    const userCount = await userModel.countUsers();
    if (userCount === 0) {
      console.log("No administrators found. Initializing bootstrap admin user...");
      
      const defaultUsername = "admin";
      const defaultPassword = "admin_secure_pass"; // Custom default password
      const defaultEmail = "admin@deva.core";

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(defaultPassword, salt);

      const newAdmin = await userModel.createUser({
        username: defaultUsername,
        email: defaultEmail,
        passwordHash: hash,
        role: "admin"
      });

      console.log(`=========================================`);
      console.log(`BOOTSTRAP ADMIN ACCOUNT CREATED`);
      console.log(`Username: ${defaultUsername}`);
      console.log(`Password: ${defaultPassword}`);
      console.log(`Email:    ${defaultEmail}`);
      console.log(`=========================================`);
    }
  } catch (error) {
    console.error("Error bootstrapping default admin:", error);
  }
}
export async function getAdminProfile(id) {
  return await userModel.findById(id);
}
export async function createAdminUser({ username, email, password }) {
  const existing = await userModel.findByUsername(username);
  if (existing) {
    throw new Error("Username already taken.");
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return await userModel.createUser({ username, email, passwordHash, role: "admin" });
}

export async function resetPassword(username, email, newPassword) {
  const user = await userModel.findByUsername(username);
  if (!user) {
    throw new Error("Invalid operator verification details.");
  }
  if (user.email.toLowerCase() !== email.toLowerCase()) {
    throw new Error("Invalid operator verification details.");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  return await userModel.updateUser(user.id, { password_hash: passwordHash });
}

export async function updateAdminAccount(userId, fields) {
  const updateData = {};
  if (fields.username) {
    const user = await userModel.findById(userId);
    if (user && user.username !== fields.username) {
      const existing = await userModel.findByUsername(fields.username);
      if (existing) {
        throw new Error("Username already taken.");
      }
    }
    updateData.username = fields.username;
  }
  if (fields.email) {
    updateData.email = fields.email;
  }
  if (fields.password) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(fields.password, salt);
    updateData.password_hash = passwordHash;
  }

  const updatedUser = await userModel.updateUser(userId, updateData);
  if (!updatedUser) {
    throw new Error("Failed to update operator profile.");
  }

  return {
    id: updatedUser.id,
    username: updatedUser.username,
    email: updatedUser.email,
    role: updatedUser.role
  };
}

