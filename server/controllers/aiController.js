const axios = require('axios');

exports.textToSegment = async (req, res) => {
  const { prompt } = req.body;

  const example = `Convert the following natural language into JSON for rule-based customer segmentation.\n
Example: "Customers who spent more than 10000 and visited less than 3 times"\n
Output: {
  "combinator": "and",
  "rules": [
    { "field": "totalSpend", "operator": ">", "value": 10000 },
    { "field": "visits", "operator": "<", "value": 3 }
  ]
}\n
Now do the same for: "${prompt}"`;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/generate',
      {
        model: "command-r",
        prompt: example,
        max_tokens: 300,
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const text = response.data.generations[0].text.trim();
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    const json = JSON.parse(text.substring(start, end + 1));

    res.json({ rules: json });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to process AI segment rules' });
  }
};
