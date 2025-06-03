const publishToStream = require('../pubsub/producer');

exports.addOrder = async (req, res) => {
  const { customerId, amount, items, orderDate } = req.body;

  if (!customerId || !amount) return res.status(400).json({ error: 'customerId and amount are required' });

  try {
    await publishToStream('order', {
      customerId, amount, items, orderDate
    });
    res.status(202).json({ message: 'Order data queued for processing' });
  } catch (err) {
    res.status(500).json({ error: 'Error queuing order data' });
  }
};
