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

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon_name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
  color_hex: { type: String, default: "#39ff14" },
  category: { type: String, required: true, enum: ["FRONTEND", "BACKEND", "TOOLS"] },
  display_order: { type: Number, default: 0 }
}, schemaOptions);

const highlightSchema = new mongoose.Schema({
  icon_name: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, required: true },
  delay_offset: { type: Number, default: 0.0 },
  display_order: { type: Number, default: 0 }
}, schemaOptions);

const Skill = mongoose.model("Skill", skillSchema, "skills");
const Highlight = mongoose.model("Highlight", highlightSchema, "about_highlights");

// --- Technical Skills ---
export async function getAllSkills() {
  const skills = await Skill.find().sort({ category: 1, display_order: 1, name: 1 });
  return skills.map(s => s.toObject());
}

export async function createSkill({ name, iconName, level, colorHex, category, displayOrder = 0 }) {
  const skill = await Skill.create({
    name,
    icon_name: iconName,
    level,
    color_hex: colorHex,
    category,
    display_order: displayOrder
  });
  return skill ? skill.toObject() : null;
}

export async function updateSkill(id, { name, iconName, level, colorHex, category, displayOrder }) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const skill = await Skill.findByIdAndUpdate(
    id,
    {
      name,
      icon_name: iconName,
      level,
      color_hex: colorHex,
      category,
      display_order: displayOrder
    },
    { new: true }
  );
  return skill ? skill.toObject() : null;
}

export async function deleteSkill(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const skill = await Skill.findByIdAndDelete(id);
  return skill ? skill.toObject() : null;
}

// --- About Page Highlights ---
export async function getAllHighlights() {
  const highlights = await Highlight.find().sort({ display_order: 1, _id: 1 });
  return highlights.map(h => h.toObject());
}

export async function createHighlight({ iconName, label, description, delayOffset = 0.0, displayOrder = 0 }) {
  const highlight = await Highlight.create({
    icon_name: iconName,
    label,
    description,
    delay_offset: delayOffset,
    display_order: displayOrder
  });
  return highlight ? highlight.toObject() : null;
}

export async function updateHighlight(id, { iconName, label, description, delayOffset, displayOrder }) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const highlight = await Highlight.findByIdAndUpdate(
    id,
    {
      icon_name: iconName,
      label,
      description,
      delay_offset: delayOffset,
      display_order: displayOrder
    },
    { new: true }
  );
  return highlight ? highlight.toObject() : null;
}

export async function deleteHighlight(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const highlight = await Highlight.findByIdAndDelete(id);
  return highlight ? highlight.toObject() : null;
}

export { Skill, Highlight };
