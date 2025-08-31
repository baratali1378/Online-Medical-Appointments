// test.js

// path: src/api/doctor/controllers/doctor.js

"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::doctor.doctor", ({ strapi }) => ({
  async updatePrice(ctx) {
    try {
      const { slotId, price } = ctx.request.body;

      if (!slotId || !price) {
        return ctx.badRequest("slotId and price are required");
      }

      const updatedSlot = await strapi.db
        .query("api::available-slot.available-slot")
        .update({
          where: { id: slotId },
          data: { price },
        });

      if (!updatedSlot) {
        return ctx.notFound("Available slot not found");
      }

      return { message: "✅ Price updated successfully", data: updatedSlot };
    } catch (error) {
      console.error("❌ Error updating price:", error);
      return ctx.internalServerError("Failed to update price");
    }
  },
}));
