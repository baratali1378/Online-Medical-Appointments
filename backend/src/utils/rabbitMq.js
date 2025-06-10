const amqp = require("amqplib");

let channel = null;

async function connect() {
  const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
  channel = await connection.createChannel();
  await channel.assertQueue("notifications", { durable: true });
  console.log("✅ RabbitMQ connected and queue asserted");
}

async function publishToQueue(message) {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  channel.sendToQueue("notifications", Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
}

module.exports = {
  connect,
  publishToQueue,
};
