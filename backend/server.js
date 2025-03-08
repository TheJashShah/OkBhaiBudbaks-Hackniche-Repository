import 'dotenv/config';  // Correct way to import dotenv in ES Module
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Supabase credentials are missing. Check your .env file.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Error handling utility
const handleResponse = (res, data, error) => {
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

// User Signup
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });
    handleResponse(res, data, error);
});

// User Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    handleResponse(res, data, error);
});

// Get Users
app.get("/users", async (req, res) => {
    const { data, error } = await supabase.from("users").select("*");
    handleResponse(res, data, error);
});

// Add User
app.post("/users", async (req, res) => {
    const { email, name } = req.body;
    const { data, error } = await supabase.from("users").insert([{ email, name }]);
    handleResponse(res, data, error);
});

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
app.get("/test-connection", async (req, res) => {
    const { data, error } = await supabase.from("users").select("*").limit(1);

    if (error) {
        console.error("❌ Database connection failed:", error.message);
        return res.status(500).json({ error: "Database connection failed" });
    }

    res.json({ message: "✅ Supabase connected successfully!", sampleData: data });
});
