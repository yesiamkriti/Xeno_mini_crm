const Customer = require("../models/Customer");
const Order = require("../models/Order");

// POST /api/customers
exports.ingestCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({ message: "Customer added", customer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /api/orders
exports.ingestOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ message: "Order added", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
