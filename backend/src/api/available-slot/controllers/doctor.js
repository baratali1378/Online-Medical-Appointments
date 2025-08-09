"use strict";
const { NotFoundError } = require("@strapi/utils").errors;

module.exports = ({ strapi }) => ({
  // 📌 Doctor: Get Available Slots
  async getDoctorAvailableSlots(ctx) {
    try {
      const doctor = ctx.state.doctor;
      if (!doctor) throw new NotFoundError("Doctor profile not found");

      const filters = { doctor: doctor.id };

      const slots = await strapi.db
        .query("api::available-slot.available-slot")
        .findMany({
          where: filters,
        });

      return ctx.send({ data: slots, meta: { count: slots.length } });
    } catch (error) {
      strapi.log.error("Error fetching doctor available slots:", error);
      return ctx.internalServerError("Could not fetch available slots");
    }
  },

  // 📌 Doctor: Create Available Slot
  async createAvailableSlot(ctx) {
    try {
      const doctor = ctx.state.doctor;
      if (!doctor) throw new NotFoundError("Doctor profile not found");
      const { date, start_time, end_time, capacity } = ctx.request.body.data;
      if (!date || !start_time || !end_time) {
        return ctx.badRequest("Date, start time, and end time are required");
      }

      const slot = await strapi.db
        .query("api::available-slot.available-slot")
        .create({
          data: {
            date,
            start_time,
            end_time,
            capacity,
            doctor: doctor.id,
            publishedAt: new Date(),
          },
        });

      return ctx.send({ message: "Slot created successfully", data: slot });
    } catch (error) {
      strapi.log.error("Error creating available slot:", error);
      return ctx.internalServerError("Could not create slot");
    }
  },

  async updateAvailableSlot(ctx) {
    try {
      const doctor = ctx.state.doctor;
      if (!doctor) throw new NotFoundError("Doctor profile not found");

      const { id } = ctx.params;
      const { data } = ctx.request.body;

      if (!data) return ctx.badRequest("Data payload is required");

      // Verify the slot exists and belongs to this doctor
      const existingSlot = await strapi.db
        .query("api::available-slot.available-slot")
        .findOne({
          where: { id, doctor: doctor.id },
        });

      if (!existingSlot) throw new NotFoundError("Slot not found");

      // Extract only allowed fields to update
      const { date, start_time, end_time, capacity, is_active } = data;

      const updateData = {
        ...(date && { date }),
        ...(start_time && { start_time }),
        ...(end_time && { end_time }),
        ...(capacity && { capacity }),
        ...(is_active !== undefined && { is_active }),
      };

      // Perform the update
      const updatedSlot = await strapi.db
        .query("api::available-slot.available-slot")
        .update({
          where: { id },
          data: updateData,
        });

      return ctx.send({
        message: "Slot updated successfully",
        data: updatedSlot,
      });
    } catch (error) {
      strapi.log.error("Error updating available slot:", error);
      return ctx.internalServerError("Could not update slot");
    }
  },

  // 📌 Doctor: Delete Available Slot
  async deleteAvailableSlot(ctx) {
    try {
      const doctor = ctx.state.doctor;
      if (!doctor) throw new NotFoundError("Doctor profile not found");

      const { id } = ctx.params;

      const slot = await strapi.db
        .query("api::available-slot.available-slot")
        .findOne({
          where: { id, doctor: doctor.id },
        });

      if (!slot) throw new NotFoundError("Slot not found");

      await strapi.db.query("api::available-slot.available-slot").delete({
        where: { id },
      });

      return ctx.send({ message: "Slot deleted successfully" });
    } catch (error) {
      strapi.log.error("Error deleting available slot:", error);
      return ctx.internalServerError("Could not delete slot");
    }
  },
});
