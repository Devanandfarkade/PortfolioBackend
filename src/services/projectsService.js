import * as projectsModel from "../models/projectsModel.js";

export async function getProjects() {
  return await projectsModel.getAllProjects();
}

export async function addProject(projectData) {
  return await projectsModel.createProject(projectData);
}

export async function editProject(id, projectData) {
  return await projectsModel.updateProject(id, projectData);
}

export async function removeProject(id) {
  return await projectsModel.deleteProject(id);
}
