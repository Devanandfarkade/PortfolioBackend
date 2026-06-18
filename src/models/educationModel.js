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

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  location: { type: String, required: true },
  period: { type: String, required: true },
  grade: { type: String, required: true },
  highlights: { type: [String], default: [] },
  color_hex: { type: String, default: "#00e5ff" },
  display_order: { type: Number, default: 0 }
}, schemaOptions);

const Education = mongoose.model("Education", educationSchema, "education");

export async function getAllEducation() {
  const educationList = await Education.find().sort({ display_order: 1, _id: -1 });
  return educationList.map(e => e.toObject());
}

export async function createEducation(data) {
  const { degree, institution, location, period, grade, highlights = [], colorHex, color_hex, displayOrder, display_order } = data;
  const education = await Education.create({
    degree,
    institution,
    location,
    period,
    grade,
    highlights,
    color_hex: color_hex || colorHex || "#00e5ff",
    display_order: display_order !== undefined ? display_order : (displayOrder !== undefined ? displayOrder : 0)
  });
  return education ? education.toObject() : null;
}

export async function updateEducation(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const { degree, institution, location, period, grade, highlights, colorHex, color_hex, displayOrder, display_order } = data;

  const updateFields = {};
  if (degree !== undefined) updateFields.degree = degree;
  if (institution !== undefined) updateFields.institution = institution;
  if (location !== undefined) updateFields.location = location;
  if (period !== undefined) updateFields.period = period;
  if (grade !== undefined) updateFields.grade = grade;
  if (highlights !== undefined) updateFields.highlights = highlights;
  if (color_hex !== undefined || colorHex !== undefined) updateFields.color_hex = color_hex || colorHex;
  if (display_order !== undefined || displayOrder !== undefined) {
    updateFields.display_order = display_order !== undefined ? display_order : displayOrder;
  }

  const education = await Education.findByIdAndUpdate(id, updateFields, { new: true });
  return education ? education.toObject() : null;
}

export async function deleteEducation(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const education = await Education.findByIdAndDelete(id);
  return education ? education.toObject() : null;
}

export { Education };
