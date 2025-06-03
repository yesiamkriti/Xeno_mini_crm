const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  query: { type: Object, required: true },
  audienceSize: Number,
  sent: Number,
  failed: Number,
  messages: [{ customerId: String, status: String }],
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
