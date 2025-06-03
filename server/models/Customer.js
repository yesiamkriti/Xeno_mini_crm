const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  totalSpend: Number,
  visits: Number,
  lastActive: Date,
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
