import mongoose from "mongoose";
import { Skill } from "./skillsModel.js";
import { Project } from "./projectsModel.js";
import { Experience } from "./experienceModel.js";
import { Education } from "./educationModel.js";
import { Certification } from "./certsModel.js";

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

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  ip_address: { type: String, default: "127.0.0.1" },
  status: { type: String, default: "UNREAD", enum: ["UNREAD", "READ"] },
  created_at: { type: Date, default: Date.now }
}, schemaOptions);

const Message = mongoose.model("Message", messageSchema, "messages");

export async function getAllMessages() {
  const messages = await Message.find().sort({ created_at: -1 });
  return messages.map(m => m.toObject());
}

export async function createMessage(data) {
  const { name, email, subject, message, ipAddress, ip_address } = data;
  const newMsg = await Message.create({
    name,
    email,
    subject,
    message,
    ip_address: ip_address || ipAddress || "127.0.0.1"
  });
  return newMsg ? newMsg.toObject() : null;
}

export async function updateMessageStatus(id, status) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const msg = await Message.findByIdAndUpdate(id, { status }, { new: true });
  return msg ? msg.toObject() : null;
}

export async function deleteMessage(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const msg = await Message.findByIdAndDelete(id);
  return msg ? msg.toObject() : null;
}

export async function getDashboardStats() {
  const total_messages = await Message.countDocuments();
  const unread_messages = await Message.countDocuments({ status: "UNREAD" });
  const total_projects = await Project.countDocuments();
  const total_skills = await Skill.countDocuments();
  const total_experience = await Experience.countDocuments();
  const total_education = await Education.countDocuments();
  const total_certs = await Certification.countDocuments();

  return {
    total_messages,
    unread_messages,
    total_projects,
    total_skills,
    total_experience,
    total_education,
    total_certs
  };
}

export { Message };
