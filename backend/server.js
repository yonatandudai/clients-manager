import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import clientsRouter from "./routes/clients.js";
import usersRoutes from "./routes/users.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/clients/", clientsRouter);
app.use("/", usersRoutes);

// DB + Server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
