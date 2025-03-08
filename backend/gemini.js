import express from 'express';
import dotenv from 'dotenv'; 
import { GoogleGenerativeAI } from '@google/generative-ai';

const check = dotenv.config({ path: './backend/.env' });
const app = express();
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function generateContentFromModel(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent("you are an AI for an online shop and i am a customer, you must service this query:"+prompt);
        const response = await result.response;
        const text = await response.text();
        return text;  
    } catch (error) {
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
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});