"use strict";

module.exports = ({ strapi }) => ({
  // 🔍 Fetch slots (for doctor or patient)
  async fetchSlots({ doctorId, date, is_active }) {
    const filters = {};
    if (doctorId) filters.doctor = doctorId;
    if (date) filters.date = date;
    if (typeof is_active !== "undefined") filters.is_active = is_active;

    return await strapi.entityService.findMany(
      "api::available-slot.available-slot",
      {
        filters,
        populate: ["appointments"],
        sort: { date: "asc", start_time: "asc" },
      }
    );
  },

  // ✏️ Update slot (doctor only)
  async updateSlot({ slotId, doctorId, data }) {
    const slot = await strapi.db
      .query("api::available-slot.available-slot")
      .findOne({
        where: { id: slotId, doctor: doctorId },
      });
    if (!slot) return null;

    return await strapi.db.query("api::available-slot.available-slot").update({
      where: { id: slotId },
      data,
    });
  },

  // ❌ Delete slot (doctor only)
  async deleteSlot({ slotId, doctorId }) {
    const slot = await strapi.db
      .query("api::available-slot.available-slot")
      .findOne({
        where: { id: slotId, doctor: doctorId },
      });
    if (!slot) return null;

    await strapi.db.query("api::available-slot.available-slot").delete({
      where: { id: slotId },
    });
    return true;
  },
});
