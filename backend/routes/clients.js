import express from "express";
import Client from "../models/Client.js";
import { verifyToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// GET all clients
router.get("/", verifyToken, async (req, res) => {
  const clients = await Client.find().sort({ createdAt: -1 });
  res.json(clients);
});

// GET client by ID
router.get("/:id", verifyToken, async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) return res.status(404).json({ message: "Client not found" });
  res.json(client);
});

// CREATE new client (Admin)
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  const newClient = new Client(req.body);
  const saved = await newClient.save();
  res.status(201).json(saved);
});

// UPDATE client (Admin)
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Client not found" });
  res.json(updated);
});

// DELETE client (Admin)
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  const deleted = await Client.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Client not found" });
  res.json({ message: "Client deleted" });
});

export default router;
