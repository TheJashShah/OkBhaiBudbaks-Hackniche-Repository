import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("🔹 Received signup request:", { username, email });

    // Validate input
    if (!username || !email || !password) {
      console.log("⚠️ Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed successfully");

    // Create user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    console.log("✅ User saved to database:", newUser._id);

    // Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing from .env file");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("✅ JWT token generated");

    // Send response (omit password for security)
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { _id: newUser._id, username, email },
    });

  } catch (error) {
    console.error("❌ Signup error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
