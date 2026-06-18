import * as educationService from "../services/educationService.js";

export async function getEducationData(req, res, next) {
  try {
    const education = await educationService.getEducation();
    res.json(education);
  } catch (error) {
    next(error);
  }
}

export async function createEducation(req, res, next) {
  const { degree, institution, location, period, grade, highlights, color_hex, display_order } = req.body;
  if (!degree || !institution || !location || !period || !grade) {
    return res.status(400).json({ error: "Missing required parameters: degree, institution, location, period, and grade are required." });
  }

  try {
    const edu = await educationService.addEducation({
      degree,
      institution,
      location,
      period,
      grade,
      highlights,
      color_hex,
      display_order
    });
    res.status(201).json({ message: "Education entry created.", education: edu });
  } catch (error) {
    next(error);
  }
}

export async function updateEducation(req, res, next) {
  const { id } = req.params;
  try {
    const edu = await educationService.editEducation(id, req.body);
    res.json({ message: "Education entry updated.", education: edu });
  } catch (error) {
    next(error);
  }
}

export async function deleteEducation(req, res, next) {
  const { id } = req.params;
  try {
    const edu = await educationService.removeEducation(id);
    res.json({ message: "Education entry purged.", education: edu });
  } catch (error) {
    next(error);
  }
}
