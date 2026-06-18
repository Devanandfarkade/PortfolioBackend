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

const certSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  credential_id: { type: String, required: true },
  link: { type: String, required: true },
  skills: { type: [String], default: [] },
  icon_emoji: { type: String, default: "🎓" },
  color_hex: { type: String, default: "#39ff14" },
  display_order: { type: Number, default: 0 }
}, schemaOptions);

const Certification = mongoose.model("Certification", certSchema, "certifications");

export async function getAllCertifications() {
  const certs = await Certification.find().sort({ display_order: 1, _id: -1 });
  return certs.map(c => c.toObject());
}

export async function createCertification(data) {
  const { title, issuer, date, credentialId, credential_id, link, skills = [], iconEmoji, icon_emoji, colorHex, color_hex, displayOrder, display_order } = data;
  const cert = await Certification.create({
    title,
    issuer,
    date,
    credential_id: credential_id || credentialId || "",
    link,
    skills,
    icon_emoji: icon_emoji || iconEmoji || "🎓",
    color_hex: color_hex || colorHex || "#39ff14",
    display_order: display_order !== undefined ? display_order : (displayOrder !== undefined ? displayOrder : 0)
  });
  return cert ? cert.toObject() : null;
}

export async function updateCertification(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const { title, issuer, date, credentialId, credential_id, link, skills, iconEmoji, icon_emoji, colorHex, color_hex, displayOrder, display_order } = data;

  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (issuer !== undefined) updateFields.issuer = issuer;
  if (date !== undefined) updateFields.date = date;
  if (credential_id !== undefined || credentialId !== undefined) {
    updateFields.credential_id = credential_id || credentialId;
  }
  if (link !== undefined) updateFields.link = link;
  if (skills !== undefined) updateFields.skills = skills;
  if (icon_emoji !== undefined || iconEmoji !== undefined) {
    updateFields.icon_emoji = icon_emoji || iconEmoji;
  }
  if (color_hex !== undefined || colorHex !== undefined) {
    updateFields.color_hex = color_hex || colorHex;
  }
  if (display_order !== undefined || displayOrder !== undefined) {
    updateFields.display_order = display_order !== undefined ? display_order : displayOrder;
  }

  const cert = await Certification.findByIdAndUpdate(id, updateFields, { new: true });
  return cert ? cert.toObject() : null;
}

export async function deleteCertification(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const cert = await Certification.findByIdAndDelete(id);
  return cert ? cert.toObject() : null;
}

export { Certification };
