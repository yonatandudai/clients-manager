import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "User"], default: "User" },
  createdAt: { type: Date, default: Date.now }
});

// This schema defines the structure of the user document in the MongoDB database.
export default mongoose.model("User", userSchema);
