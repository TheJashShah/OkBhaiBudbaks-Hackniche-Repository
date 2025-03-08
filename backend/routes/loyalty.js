import express from "express";
const router = express.Router();
import User from "../models/loyalty"; 

// Update loyalty points using email
router.post("/update-loyalty", async (req, res) => {
    try {
        const { email, points } = req.body;

        if (!email || !points) {
            return res.status(400).json({ message: "Missing email or points" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.loyaltyPoints += points;
        await user.save();

        return res.status(200).json({ 
            message: "Loyalty points updated", 
            totalPoints: user.loyaltyPoints 
        });

    } catch (error) {
        console.error("Error updating loyalty points:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
