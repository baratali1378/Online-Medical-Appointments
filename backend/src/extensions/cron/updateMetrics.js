"use strict";

module.exports = async ({ strapi }) => {
  try {
    await strapi.service("api::metric.metric").updateMetrics();
    strapi.log.info("✅ Metrics updated successfully");
  } catch (error) {
    strapi.log.error("❌ Failed to update metrics:", error);
  }
};
