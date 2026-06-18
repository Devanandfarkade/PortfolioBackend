import * as experienceModel from "../models/experienceModel.js";

export async function getExperiences() {
  return await experienceModel.getAllExperiences();
}

export async function addExperience(expData) {
  return await experienceModel.createExperience(expData);
}

export async function editExperience(id, expData) {
  return await experienceModel.updateExperience(id, expData);
}

export async function removeExperience(id) {
  return await experienceModel.deleteExperience(id);
}
