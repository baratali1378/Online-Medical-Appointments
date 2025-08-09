"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::metric.metric", ({ strapi }) => ({
  async getTotals(ctx) {
    try {
      // Since it's a single type, find the only record
      const metrics = await strapi.db.query("api::metric.metric").findOne({
        where: {},
      });

      if (!metrics) {
        return ctx.notFound("Metrics record not found");
      }

      return {
        data: {
          totalCities: metrics.totalCities || 0,
          totalDoctors: metrics.totalDoctors || 0,
          successfulAppointments: metrics.successfulAppointments || 0,
        },
      };
    } catch (error) {
      strapi.log.error("Error fetching metrics:", error);
      return ctx.internalServerError("Unable to fetch metrics");
    }
  },
}));
