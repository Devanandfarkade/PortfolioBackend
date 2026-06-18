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

const profileSettingsSchema = new mongoose.Schema({
  name: { type: String, default: "Devanand Farkade" },
  status: { type: String, default: "FULL STACK DEVELOPER" },
  core_stack: { type: String, default: "React.js, Node.js, Express, Java" },
  about_text: { type: String, required: true },
  email: { type: String, default: "devaapatil330@gmail.com" },
  phone: { type: String, default: "+91 9518331190" },
  location: { type: String, default: "Pune, Maharashtra, India" },
  resume_url: { type: String, default: "" },
  github_url: { type: String, default: "" },
  linkedin_url: { type: String, default: "" },
  updated_at: { type: Date, default: Date.now }
}, schemaOptions);

const heroRoleSchema = new mongoose.Schema({
  role_name: { type: String, required: true },
  display_order: { type: Number, default: 0 }
}, schemaOptions);

const heroStatSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  display_order: { type: Number, default: 0 }
}, schemaOptions);

const ProfileSettings = mongoose.model("ProfileSettings", profileSettingsSchema, "profile_settings");
const HeroRole = mongoose.model("HeroRole", heroRoleSchema, "hero_roles");
const HeroStat = mongoose.model("HeroStat", heroStatSchema, "hero_stats");

// --- Profile Settings ---
export async function getProfile() {
  const result = await ProfileSettings.findOne();
  return result ? result.toObject() : null;
}

export async function updateProfile(fields) {
  const result = await ProfileSettings.findOneAndUpdate(
    {},
    { ...fields, updated_at: new Date() },
    { new: true, upsert: true }
  );
  return result ? result.toObject() : null;
}

// --- Hero Roles ---
export async function getHeroRoles() {
  const roles = await HeroRole.find().sort({ display_order: 1, _id: 1 });
  return roles.map(r => r.toObject());
}

export async function createHeroRole(roleName, displayOrder = 0) {
  const role = await HeroRole.create({ role_name: roleName, display_order: displayOrder });
  return role ? role.toObject() : null;
}

export async function updateHeroRole(id, roleName, displayOrder) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const role = await HeroRole.findByIdAndUpdate(id, { role_name: roleName, display_order: displayOrder }, { new: true });
  return role ? role.toObject() : null;
}

export async function deleteHeroRole(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const role = await HeroRole.findByIdAndDelete(id);
  return role ? role.toObject() : null;
}

// --- Hero Stats ---
export async function getHeroStats() {
  const stats = await HeroStat.find().sort({ display_order: 1, _id: 1 });
  return stats.map(s => s.toObject());
}

export async function createHeroStat(value, label, displayOrder = 0) {
  const stat = await HeroStat.create({ value, label, display_order: displayOrder });
  return stat ? stat.toObject() : null;
}

export async function updateHeroStat(id, value, label, displayOrder) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const stat = await HeroStat.findByIdAndUpdate(id, { value, label, display_order: displayOrder }, { new: true });
  return stat ? stat.toObject() : null;
}

export async function deleteHeroStat(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const stat = await HeroStat.findByIdAndDelete(id);
  return stat ? stat.toObject() : null;
}

export { ProfileSettings, HeroRole, HeroStat };
