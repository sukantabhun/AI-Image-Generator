import express, { Router } from 'express';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const router = Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.route('/').get((req, res) => {
    res.send('Hello');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        console.log(aiResponse)
        const image = aiResponse.data[0].b64_json;
        console.log(image)
        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

export default router;
