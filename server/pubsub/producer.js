const { createClient } = require('redis');
const client = createClient({ url: process.env.REDIS_URL });
client.connect();

const streamKey = 'data_ingestion_stream';

const publishToStream = async (type, data) => {
  await client.xAdd(streamKey, '*', {
    type,
    payload: JSON.stringify(data),
  });
};

module.exports = publishToStream;
