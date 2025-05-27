const mongoose = require("mongoose");

const segmentSchema = new mongoose.Schema({
  name: String,
  rules: [Object], // dynamic list of conditions
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Segment", segmentSchema);
