const Campaign = require('../models/Campaign');

exports.handleReceipt = async (req, res) => {
  const { campaignId, customerId, status } = req.body;

  try {
    const update = {
      $push: { messages: { customerId, status } },
      $inc: status === 'SENT' ? { sent: 1 } : { failed: 1 }
    };

    await Campaign.findByIdAndUpdate(campaignId, update);
    res.json({ message: 'Status recorded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record delivery status' });
  }
};
