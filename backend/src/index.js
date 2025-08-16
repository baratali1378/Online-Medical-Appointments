"use strict";
const rabbitmq = require("./utils/rabbitMq");

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    // Skip RabbitMQ in test environment
    if (process.env.NODE_ENV === "test") {
      strapi.log.info("⚠️ RabbitMQ skipped in test environment");
      return;
    }

    // Normal initialization
    await rabbitmq.connect();
    strapi.rabbitmq = rabbitmq;
    strapi.log.info("✅ RabbitMQ initialized in bootstrap");
  },
};
