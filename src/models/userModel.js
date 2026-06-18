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

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "admin" },
  created_at: { type: Date, default: Date.now }
}, schemaOptions);

const User = mongoose.model("User", userSchema, "users");

export async function findByUsername(username) {
  const user = await User.findOne({ username });
  return user ? user.toObject() : null;
}

export async function findById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const user = await User.findById(id);
  return user ? user.toObject() : null;
}

export async function createUser({ username, email, passwordHash, role = "admin" }) {
  const user = await User.create({
    username,
    email,
    password_hash: passwordHash,
    role
  });
  return user ? user.toObject() : null;
}

export async function countUsers() {
  return await User.countDocuments();
}

export async function findByEmail(email) {
  const user = await User.findOne({ email });
  return user ? user.toObject() : null;
}

export async function updateUser(id, fields) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const user = await User.findByIdAndUpdate(id, fields, { new: true });
  return user ? user.toObject() : null;
}

export { User };
