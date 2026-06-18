import * as skillsService from "../services/skillsService.js";

export async function getSkillsData(req, res, next) {
  try {
    const data = await skillsService.getSkillsPageData();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

// --- CRUD Skills ---
export async function createSkill(req, res, next) {
  const { name, iconName, level, colorHex, category, displayOrder } = req.body;
  if (!name || !iconName || level === undefined || !category) {
    return res.status(400).json({ error: "Missing required parameters: name, iconName, level, and category are required." });
  }

  try {
    const skill = await skillsService.addSkill({ name, iconName, level, colorHex, category, displayOrder });
    res.status(201).json({ message: "Skill created successfully.", skill });
  } catch (error) {
    next(error);
  }
}

export async function updateSkill(req, res, next) {
  const { id } = req.params;
  try {
    const skill = await skillsService.editSkill(id, req.body);
    res.json({ message: "Skill updated successfully.", skill });
  } catch (error) {
    next(error);
  }
}

export async function deleteSkill(req, res, next) {
  const { id } = req.params;
  try {
    const skill = await skillsService.removeSkill(id);
    res.json({ message: "Skill purged successfully.", skill });
  } catch (error) {
    next(error);
  }
}

// --- CRUD Highlights ---
export async function createHighlight(req, res, next) {
  const { iconName, label, description, delayOffset, displayOrder } = req.body;
  if (!iconName || !label || !description) {
    return res.status(400).json({ error: "Missing parameters: iconName, label, and description are required." });
  }

  try {
    const highlight = await skillsService.addHighlight({ iconName, label, description, delayOffset, displayOrder });
    res.status(201).json({ message: "About highlight entry created.", highlight });
  } catch (error) {
    next(error);
  }
}

export async function updateHighlight(req, res, next) {
  const { id } = req.params;
  try {
    const highlight = await skillsService.editHighlight(id, req.body);
    res.json({ message: "About highlight entry updated.", highlight });
  } catch (error) {
    next(error);
  }
}

export async function deleteHighlight(req, res, next) {
  const { id } = req.params;
  try {
    const highlight = await skillsService.removeHighlight(id);
    res.json({ message: "About highlight entry purged.", highlight });
  } catch (error) {
    next(error);
  }
}
