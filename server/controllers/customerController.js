const publishToStream = require('../pubsub/producer');

exports.addCustomer = async (req, res) => {
  const { name, email, phone, totalSpend, visits, lastActive } = req.body;

  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  try {
    await publishToStream('customer', {
      name, email, phone, totalSpend, visits, lastActive
    });
    res.status(202).json({ message: 'Customer data queued for processing' });
  } catch (err) {
    res.status(500).json({ error: 'Error queuing customer data' });
  }
};
