import * as messagesModel from "../models/messagesModel.js";
import { sendContactEmail, sendThankYouEmail } from "./mailService.js";

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

  // 1. Save to Database
  const savedMessage = await messagesModel.createMessage({ name, email, subject, message, ipAddress });

  // 2. Dispatch Email Transmission to Admin
  try {
    console.log(`[SMTP] Dispatching admin notification email...`);
    await sendContactEmail({ name, email, subject, message, ipAddress });
    console.log(`[SMTP] Admin notification email dispatched successfully.`);
  } catch (mailError) {
    console.error("[SMTP] Critical: Email dispatch to admin failed:", mailError);
    throw new Error(`Message saved to database, but email dispatch failed: ${mailError.message}`);
  }

  // 3. Dispatch Auto-Reply Acknowledgment to Sender
  try {
    console.log(`[SMTP] Dispatching sender thank-you auto-reply to: ${email}...`);
    await sendThankYouEmail({ name, email, subject });
    console.log(`[SMTP] Sender thank-you auto-reply dispatched successfully.`);
  } catch (replyError) {
    console.warn("[SMTP] Warning: Handshake confirmation auto-reply failed:", replyError);
    // Do not throw so the overall submit contact process succeeds
  }

  return savedMessage;
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
