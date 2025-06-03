const { createClient } = require('redis');
const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

const client = createClient({ url: process.env.REDIS_URL });
const streamKey = 'data_ingestion_stream';
const group = 'crm_group';
const consumerName = 'crm_consumer';

(async () => {
  await client.connect();

  try {
    await client.xGroupCreate(streamKey, group, '0', { MKSTREAM: true });
  } catch (e) {
    if (!e.message.includes('BUSYGROUP')) throw e;
  }

  console.log('Consumer started...');
  while (true) {
    const res = await client.xReadGroup(group, consumerName, {
      key: streamKey,
      id: '>',
    }, { COUNT: 10, BLOCK: 5000 });

    if (res) {
      for (const msg of res[0].messages) {
        const { type, payload } = msg.message;
        const data = JSON.parse(payload);

        try {
          if (type === 'customer') await Customer.create(data);
          else if (type === 'order') await Order.create(data);
        } catch (err) {
          console.error(`Error saving ${type}:`, err.message);
        }

        await client.xAck(streamKey, group, msg.id);
      }
    }
  }
})();
