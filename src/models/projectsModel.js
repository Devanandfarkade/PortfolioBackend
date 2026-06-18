import mongoose from "mongoose";

const schemaOptions = {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id ? ret._id.toString() : ret.id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id ? ret._id.toString() : ret.id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
};

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  repo_url: { type: String, default: "" },
  live_url: { type: String, default: "" },
  status: { type: String, default: "STABLE" },
  color_hex: { type: String, default: "#00e5ff" },
  tags: { type: [String], default: [] }
}, schemaOptions);

const Project = mongoose.model("Project", projectSchema, "projects");

export async function getAllProjects() {
  const projects = await Project.find().sort({ _id: -1 });
  return projects.map(p => p.toObject());
}

export async function getProjectById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const project = await Project.findById(id);
  return project ? project.toObject() : null;
}

export async function createProject(data) {
  const { title, description, category, repoUrl, repo_url, liveUrl, live_url, status = "STABLE", colorHex, color_hex, tags = [] } = data;
  
  const project = await Project.create({
    title,
    description,
    category,
    repo_url: repo_url || repoUrl || "",
    live_url: live_url || liveUrl || "",
    status,
    color_hex: color_hex || colorHex || "#00e5ff",
    tags
  });
  return project ? project.toObject() : null;
}

export async function updateProject(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const { title, description, category, repoUrl, repo_url, liveUrl, live_url, status, colorHex, color_hex, tags } = data;
  
  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (category !== undefined) updateFields.category = category;
  if (repo_url !== undefined || repoUrl !== undefined) updateFields.repo_url = repo_url || repoUrl;
  if (live_url !== undefined || liveUrl !== undefined) updateFields.live_url = live_url || liveUrl;
  if (status !== undefined) updateFields.status = status;
  if (color_hex !== undefined || colorHex !== undefined) updateFields.color_hex = color_hex || colorHex;
  if (tags !== undefined) updateFields.tags = tags;

  const project = await Project.findByIdAndUpdate(id, updateFields, { new: true });
  return project ? project.toObject() : null;
}

export async function deleteProject(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const project = await Project.findByIdAndDelete(id);
  return project ? project.toObject() : null;
}

export { Project };
