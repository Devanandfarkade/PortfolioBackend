import * as experienceService from "../services/experienceService.js";

export async function getExperienceData(req, res, next) {
  try {
    const experiences = await experienceService.getExperiences();
    res.json(experiences);
  } catch (error) {
    next(error);
  }
}

export async function createExperience(req, res, next) {
  const { role, company, location, period, type, description, points, tech, color_hex, display_order } = req.body;
  if (!role || !company || !location || !period || !description) {
    return res.status(400).json({ error: "Missing required parameters: role, company, location, period, and description are required." });
  }

  try {
    const experience = await experienceService.addExperience({
      role,
      company,
      location,
      period,
      type,
      description,
      points,
      tech,
      color_hex,
      display_order
    });
    res.status(201).json({ message: "Experience timeline entry created.", experience });
  } catch (error) {
    next(error);
  }
}

export async function updateExperience(req, res, next) {
  const { id } = req.params;
  try {
    const experience = await experienceService.editExperience(id, req.body);
    res.json({ message: "Experience timeline entry updated.", experience });
  } catch (error) {
    next(error);
  }
}

export async function deleteExperience(req, res, next) {
  const { id } = req.params;
  try {
    const experience = await experienceService.removeExperience(id);
    res.json({ message: "Experience timeline entry purged.", experience });
  } catch (error) {
    next(error);
  }
}
