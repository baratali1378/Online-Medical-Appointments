"use strict";
const rabbitmq = require("./utils/rabbitMq");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    await rabbitmq.connect();
    strapi.rabbitmq = rabbitmq;
    strapi.log.info("✅ RabbitMQ initialized in bootstrap");
  },
};
