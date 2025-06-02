"use strict";
const redis = require("./utils/redis");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  bootstrap({ strapi }) {
    strapi.redis = redis;

    strapi.log.info("✅ Redis initialized in bootstrap");
  },
};
