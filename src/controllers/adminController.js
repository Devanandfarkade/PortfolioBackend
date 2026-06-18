import * as messagesService from "../services/messagesService.js";

export async function getStats(req, res, next) {
  try {
    const stats = await messagesService.fetchDashboardStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
}
