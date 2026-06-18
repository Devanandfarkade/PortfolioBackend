import * as messagesService from "../services/messagesService.js";

export async function sendMessage(req, res, next) {
  const { name, email, subject, message } = req.body;
  const ipAddress = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";

  try {
    const sent = await messagesService.submitContactMessage({
      name,
      email,
      subject,
      message,
      ipAddress
    });
    res.status(201).json({ message: "Transmission received. Secure connection established.", contact: sent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getMessages(req, res, next) {
  try {
    const inbox = await messagesService.getInbox();
    res.json(inbox);
  } catch (error) {
    next(error);
  }
}

export async function updateMessageStatus(req, res, next) {
  const { id } = req.params;
  const { isRead } = req.body;

  if (isRead === undefined) {
    return res.status(400).json({ error: "Parameter isRead is required." });
  }

  try {
    const updated = await messagesService.markMessageRead(id, isRead);
    res.json({ message: `Message status updated to ${isRead ? "READ" : "UNREAD"}.`, contact: updated });
  } catch (error) {
    next(error);
  }
}

export async function deleteMessage(req, res, next) {
  const { id } = req.params;
  try {
    const deleted = await messagesService.removeMessage(id);
    res.json({ message: "Message purged from inbox database.", contact: deleted });
  } catch (error) {
    next(error);
  }
}

export async function getStats(req, res, next) {
  try {
    const stats = await messagesService.fetchDashboardStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
}
