import express from 'express';
import dotenv from 'dotenv'; 
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from "cors";
const apiKey = process.env.GEMINI_API_KEY; 
const check = dotenv.config({ path: './backend/.env' });
const app = express();
app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
  }));
const genAI = new GoogleGenerativeAI(apiKey);
async function generateContentFromModel(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent("you are an AI for an online shop and i am a customer, you must service this query:"+prompt);
        const response = await result.response;
        const text = await response.text();
        return text;  
    } catch (error) {
        console.log(process.env.VITE_GEMINI_API_KEY);
        console.error('Error generating content:', error);
        throw new Error('Failed to generate content');
    }
}

// POST route to handle content generation request
app.post('/generate-content', async (req, res) => {
    const { text } = req.body;

    // Validate input
    if (!text) {
        return res.status(400).json({ error: 'Text field is required' });
    }

    try {
        const generatedText = await generateContentFromModel(text);
        res.json({ generatedText });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});