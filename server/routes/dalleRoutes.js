import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai'; // Import OpenAI client directly

dotenv.config();

const router = express.Router();

// Initialize OpenAI client directly with API key
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,  // Ensure your API key is set correctly in the .env file
});

// Test route
router.route('/').get((req, res) => {
    res.send('Hello From Dall-e');
});

// Image generation route
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response?.data?.error?.message || "Something went wrong");
    }
});

export default router;
