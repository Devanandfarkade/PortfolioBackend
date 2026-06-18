import * as projectsService from "../services/projectsService.js";

export async function getProjectsData(req, res, next) {
  try {
    const projects = await projectsService.getProjects();
    res.json(projects);
  } catch (error) {
    next(error);
  }
}

export async function createProject(req, res, next) {
  const { title, description, category, repo_url, live_url, status, color_hex, tags } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({ error: "Missing required parameters: title, description, and category are required." });
  }

  try {
    const project = await projectsService.addProject({
      title,
      description,
      category,
      repo_url,
      live_url,
      status,
      color_hex,
      tags
    });
    res.status(201).json({ message: "Project created successfully.", project });
  } catch (error) {
    next(error);
  }
}

export async function updateProject(req, res, next) {
  const { id } = req.params;
  try {
    const project = await projectsService.editProject(id, req.body);
    res.json({ message: "Project updated successfully.", project });
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(req, res, next) {
  const { id } = req.params;
  try {
    const project = await projectsService.removeProject(id);
    res.json({ message: "Project purged successfully.", project });
  } catch (error) {
    next(error);
  }
}
