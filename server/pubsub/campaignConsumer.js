const { createClient } = require('redis');
const axios = require('axios');

const streamKey = 'campaign_delivery_stream';
const group = 'delivery_group';
const consumerName = 'delivery_consumer';

const client = createClient({ url: process.env.REDIS_URL });

(async () => {
  await client.connect();

  try {
    await client.xGroupCreate(streamKey, group, '0', { MKSTREAM: true });
  } catch (e) {
    if (!e.message.includes('BUSYGROUP')) throw e;
  }

  console.log('🚀 Campaign delivery consumer started');

  while (true) {
    const res = await client.xReadGroup(group, consumerName, {
      key: streamKey,
      id: '>',
    }, { COUNT: 10, BLOCK: 5000 });

    if (res) {
      const receiptPromises = [];

      for (const msg of res[0].messages) {
        const payload = JSON.parse(msg.message.payload);

        const success = Math.random() < 0.9 ? 'SENT' : 'FAILED';

        receiptPromises.push(
          axios.post('http://localhost:5000/api/receipt', {
            campaignId: payload.campaignId,
            customerId: payload.customer.id,
            status: success
          })
        );

        await client.xAck(streamKey, group, msg.id);
      }

      await Promise.all(receiptPromises);
    }
  }
})();
