    import express from "express";
    import bcrypt from "bcryptjs";
    import jwt from "jsonwebtoken";
    import User from "../models/User.js";
    import { verifyToken } from "../middleware/auth.js";
    import { registerSchema, loginSchema } from "../models/userValidator.js";

    const router = express.Router();

    // Register a new user
    router.post("/register", async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, role } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed, role });
        await user.save();

        res.status(201).json({ message: "User registered" });
    } catch {
        res.status(500).json({ message: "Failed to register user" });
    }
    });

    // Login
    router.post("/login", async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
        );

        res.json({ token });
    } catch {
        res.status(500).json({ message: "Login failed" });
    }
    });

    // Get current user info (requires token)
    router.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch {
        res.status(500).json({ message: "Failed to fetch user" });
    }
    });

    export default router;
