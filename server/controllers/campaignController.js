const Campaign = require('../models/Campaign');
const Customer = require('../models/Customer');
const translateQuery = require('../utils/translateQuery');

exports.previewAudience = async (req, res) => {
  try {
    const query = translateQuery(req.body.query);
    const count = await Customer.countDocuments(query);
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Error previewing audience' });
  }
};

exports.createCampaign = async (req, res) => {
  const { name, query } = req.body;

  try {
    const mongoQuery = translateQuery(query);
    const audience = await Customer.find(mongoQuery);
    const audienceSize = audience.length;

    const campaign = await Campaign.create({
      name,
      query,
      audienceSize,
      sent: 0,
      failed: 0,
      messages: []
    });

    // Push each to queue for delivery
    for (const customer of audience) {
      const message = {
        campaignId: campaign._id,
        customer: {
          id: customer._id,
          name: customer.name,
          email: customer.email,
        },
        text: `Hi ${customer.name}, here’s 10% off on your next order!`
      };

      const redis = require('redis').createClient({ url: process.env.REDIS_URL });
      await redis.connect();
      await redis.xAdd('campaign_delivery_stream', '*', {
        payload: JSON.stringify(message)
      });
      await redis.disconnect();
    }

    res.json({ message: 'Campaign created and delivery initiated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching campaigns' });
  }
};
