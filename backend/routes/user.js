import express from "express";
import jwt from "jsonwebtoken";
import UserDetails from "../models/userDetails.js";

const router = express.Router();

router.get("/api/users/profile", async (req, res) => {
    try {
      const email = req.query.email;
      if (!email) return res.status(400).json({ message: "Email is required" });
  
      const user = await UserDetails.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  
  // Route to Save or Update User Profile
  router.post("/api/users/profile", async (req, res) => {
    try {
      const { email, fullName, age, gender, location, occupation, phoneNumber, interests } = req.body;
      if (!email) return res.status(400).json({ message: "Email is required" });
       console.log(email)
      const updatedUser = await UserDetails.findOneAndUpdate(
        { email },
        { fullName, age, gender, location, occupation, phoneNumber, interests },
        { new: true, upsert: true } // Creates new if not found
      );
  
      res.json({ message: "Profile saved successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  export default router;