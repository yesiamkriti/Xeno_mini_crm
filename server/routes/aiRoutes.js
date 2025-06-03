const express = require('express');
const router = express.Router();
const { textToSegment } = require('../controllers/aiController');

router.post('/ai/text-to-segment', textToSegment);
router.post('/ai/message-suggestions', async (req, res) => {
  const { objective } = req.body;

  const prompt = `You are an expert marketer. Given the campaign goal: "${objective}", generate 3 short, personalized marketing message variants to engage the customer. Return each as a bullet point.`;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/generate',
      {
        model: "command-r",
        prompt,
        max_tokens: 200,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const lines = response.data.generations[0].text
      .trim()
      .split(/\n/)
      .filter((line) => line.trim())
      .map((line) => line.replace(/^[-*•\d.]+/, '').trim());

    res.json({ messages: lines });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to generate messages' });
  }
});

module.exports = router;
