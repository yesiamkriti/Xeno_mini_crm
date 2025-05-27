const CommunicationLog = require("../models/CommunicationLog");
const Customer = require("../models/Customer");
const axios = require("axios");

exports.sendCampaign = async (req, res) => {
  const { campaignName, messageTemplate, customers } = req.body;

  const logs = [];

  for (const customer of customers) {
    const personalizedMsg = messageTemplate.replace("{{name}}", customer.name);
    
    const log = await CommunicationLog.create({
      customerId: customer._id,
      message: personalizedMsg,
      status: "PENDING",
      campaignName
    });

    // Simulate async vendor call
    setTimeout(async () => {
      const status = Math.random() < 0.9 ? "SENT" : "FAILED";
      await axios.post("http://localhost:5000/api/campaign/receipt", {
        logId: log._id,
        status
      });
    }, 500);

    logs.push(log);
  }

  res.json({ message: "Campaign dispatched", logs });
};

exports.updateReceipt = async (req, res) => {
  const { logId, status } = req.body;
  try {
    await CommunicationLog.findByIdAndUpdate(logId, { status });
    res.json({ message: "Delivery status updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCampaignHistory = async (req, res) => {
  try {
    const logs = await CommunicationLog.find()
      .populate("customerId", "name")
      .sort({ timestamp: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
