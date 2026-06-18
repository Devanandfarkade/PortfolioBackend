import * as educationModel from "../models/educationModel.js";

export async function getEducation() {
  return await educationModel.getAllEducation();
}

export async function addEducation(eduData) {
  return await educationModel.createEducation(eduData);
}

export async function editEducation(id, eduData) {
  return await educationModel.updateEducation(id, eduData);
}

export async function removeEducation(id) {
  return await educationModel.deleteEducation(id);
}
