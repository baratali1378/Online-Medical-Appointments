"use strict";
const { NotFoundError } = require("@strapi/utils").errors;

module.exports = ({ strapi }) => ({
  // 📌 Patient: Get Available Slots for a Doctor
  async getDoctorAvailableSlots(ctx) {
    try {
      const { doctorId } = ctx.params;

      if (!doctorId) {
        return ctx.badRequest("Doctor ID is required");
      }

      // 🔍 Check if doctor exists
      const doctorExists = await strapi.db.query("api::doctor.doctor").findOne({
        where: { id: doctorId },
        select: ["id"],
      });

      if (!doctorExists) {
        throw new NotFoundError("Doctor not found");
      }

      // 📅 Get available slots for doctor
      const slots = await strapi.db
        .query("api::available-slot.available-slot")
        .findMany({
          where: {
            doctor: doctorId,
            is_active: true, // Only active slots
          },
          orderBy: { date: "asc" }, // Sort by date ascending
        });

      return ctx.send({
        data: slots,
        meta: { count: slots.length },
      });
    } catch (error) {
      strapi.log.error("Error fetching doctor available slots:", error);
      return ctx.internalServerError("Could not fetch available slots");
    }
  },
});
