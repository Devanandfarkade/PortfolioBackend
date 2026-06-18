import * as authService from "../services/authService.js";

export async function login(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required parameters." });
  }

  try {
    const authData = await authService.loginUser(username, password);
    res.json({
      message: "Handshake authorized. Token granted.",
      ...authData
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

export async function getProfile(req, res, next) {
  try {
    const profile = await authService.getAdminProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    next(error);
  }
}

export async function registerAdmin(req, res, next) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required." });
  }
  try {
    const user = await authService.createAdminUser({ username, email, password });
    res.status(201).json({ message: "Admin account registered.", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function forgotPassword(req, res, next) {
  const { username, email, newPassword } = req.body;
  if (!username || !email || !newPassword) {
    return res.status(400).json({ error: "Username, email, and new password are required." });
  }

  try {
    await authService.resetPassword(username, email, newPassword);
    res.json({ message: "Operator passphrase reset complete." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateAccount(req, res, next) {
  const { username, email, password } = req.body;
  const userId = req.user.id;

  try {
    const updated = await authService.updateAdminAccount(userId, { username, email, password });
    res.json({ message: "Operator profile settings updated.", user: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

