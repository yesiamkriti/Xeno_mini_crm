const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },
  message: String,
  status: { type: String, enum: ["PENDING", "SENT", "FAILED"], default: "PENDING" },
  campaignName: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CommunicationLog", logSchema);
