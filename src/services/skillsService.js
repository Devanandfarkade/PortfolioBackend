import * as skillsModel from "../models/skillsModel.js";

export async function getSkillsPageData() {
  const skills = await skillsModel.getAllSkills();
  const highlights = await skillsModel.getAllHighlights();

  return {
    skills,
    highlights
  };
}

// --- CRUD Skills ---
export async function addSkill(skillData) {
  return await skillsModel.createSkill(skillData);
}

export async function editSkill(id, skillData) {
  return await skillsModel.updateSkill(id, skillData);
}

export async function removeSkill(id) {
  return await skillsModel.deleteSkill(id);
}

// --- CRUD Highlights ---
export async function addHighlight(highlightData) {
  return await skillsModel.createHighlight(highlightData);
}

export async function editHighlight(id, highlightData) {
  return await skillsModel.updateHighlight(id, highlightData);
}

export async function removeHighlight(id) {
  return await skillsModel.deleteHighlight(id);
}
