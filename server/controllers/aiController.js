const { CohereClient } = require("cohere-ai");
const dotenv = require("dotenv");
dotenv.config();
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

exports.generateMessages = async (req, res) => {
  const { objective } = req.body;

  try {
    const response = await cohere.generate({
      model: "command",
      prompt: `Write 3 short, personalized marketing messages for this campaign objective: "${objective}".`,
      max_tokens: 150,
      temperature: 0.7,
    });

    const raw = response.generations[0].text;
    const messages = raw.split("\n").filter(m => m.trim().length > 0);
    res.json({ messages });
  } catch (error) {
    console.error("AI generation failed:", error);
    res.status(500).json({ error: error.message });
  }
};
