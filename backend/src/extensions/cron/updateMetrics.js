"use strict";

module.exports = async ({ strapi }) => {
  try {
    await strapi.service("api::metric.update").updateMetrics();
    strapi.log.info("✅ Metrics updated successfully");
  } catch (error) {
    strapi.log.error("❌ Failed to update metrics:", error);
  }
};
