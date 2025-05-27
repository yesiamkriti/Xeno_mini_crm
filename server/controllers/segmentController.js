const Customer = require("../models/Customer");
const Segment = require("../models/segment");

// Helper: evaluate if customer meets a single rule
function evaluateRule(customer, rule) {
  const field = rule.field;
  const value = rule.value;
  const op = rule.op;

  if (field === "inactive") {
    const inactiveDays = (Date.now() - new Date(customer.lastActive)) / (1000 * 60 * 60 * 24);
    return op === ">" ? inactiveDays > value : inactiveDays < value;
  }

  if (op === ">") return customer[field] > value;
  if (op === "<") return customer[field] < value;
  return false;
}

// POST /api/segments/preview
exports.previewSegment = async (req, res) => {
  try {
    const { rules } = req.body;
    const customers = await Customer.find();
    const matched = customers.filter(customer => rules.every(rule => evaluateRule(customer, rule)));
    res.json({ size: matched.length, customers: matched });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/segments
exports.saveSegment = async (req, res) => {
  try {
    const segment = await Segment.create(req.body);
    res.status(201).json({ message: "Segment saved", segment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/segments
exports.getSegments = async (req, res) => {
  const segments = await Segment.find().sort({ createdAt: -1 });
  res.json(segments);
};
