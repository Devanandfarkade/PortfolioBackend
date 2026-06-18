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

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  period: { type: String, required: true },
  type: { type: String, default: "Full-Time" },
  description: { type: String, required: true },
  points: { type: [String], default: [] },
  tech: { type: [String], default: [] },
  color_hex: { type: String, default: "#39ff14" },
  display_order: { type: Number, default: 0 }
}, schemaOptions);

const Experience = mongoose.model("Experience", experienceSchema, "experiences");

export async function getAllExperiences() {
  const experiences = await Experience.find().sort({ display_order: 1, _id: -1 });
  return experiences.map(e => e.toObject());
}

export async function createExperience(data) {
  const { role, company, location, period, type = "Full-Time", description, points = [], tech = [], colorHex, color_hex, displayOrder, display_order } = data;
  const experience = await Experience.create({
    role,
    company,
    location,
    period,
    type,
    description,
    points,
    tech,
    color_hex: color_hex || colorHex || "#39ff14",
    display_order: display_order !== undefined ? display_order : (displayOrder !== undefined ? displayOrder : 0)
  });
  return experience ? experience.toObject() : null;
}

export async function updateExperience(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const { role, company, location, period, type, description, points, tech, colorHex, color_hex, displayOrder, display_order } = data;
  
  const updateFields = {};
  if (role !== undefined) updateFields.role = role;
  if (company !== undefined) updateFields.company = company;
  if (location !== undefined) updateFields.location = location;
  if (period !== undefined) updateFields.period = period;
  if (type !== undefined) updateFields.type = type;
  if (description !== undefined) updateFields.description = description;
  if (points !== undefined) updateFields.points = points;
  if (tech !== undefined) updateFields.tech = tech;
  if (color_hex !== undefined || colorHex !== undefined) updateFields.color_hex = color_hex || colorHex;
  if (display_order !== undefined || displayOrder !== undefined) {
    updateFields.display_order = display_order !== undefined ? display_order : displayOrder;
  }

  const experience = await Experience.findByIdAndUpdate(id, updateFields, { new: true });
  return experience ? experience.toObject() : null;
}

export async function deleteExperience(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const experience = await Experience.findByIdAndDelete(id);
  return experience ? experience.toObject() : null;
}

export { Experience };
