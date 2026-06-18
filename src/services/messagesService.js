import * as messagesModel from "../models/messagesModel.js";

export async function getInbox() {
  return await messagesModel.getAllMessages();
}

export async function submitContactMessage({ name, email, subject, message, ipAddress }) {
  if (!name || !email || !message) {
    throw new Error("Missing required form parameters: name, email, and message are required.");
  }
  
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email address format.");
  }

  return await messagesModel.createMessage({ name, email, subject, message, ipAddress });
}

export async function markMessageRead(id, isRead) {
  const status = isRead ? "READ" : "UNREAD";
  return await messagesModel.updateMessageStatus(id, status);
}

export async function removeMessage(id) {
  return await messagesModel.deleteMessage(id);
}

export async function fetchDashboardStats() {
  return await messagesModel.getDashboardStats();
}
