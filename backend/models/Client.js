import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// This schema defines the structure of the client document in the MongoDB database.
export default mongoose.model("Client", clientSchema);
