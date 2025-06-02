"use strict";
const dayjs = require("dayjs");

module.exports = ({ strapi }) => ({
  async getAppointmentsForReminders() {
    const tomorrow = dayjs().add(1, "day").startOf("day");
    const endOfDay = tomorrow.endOf("day");

    const appointments = await strapi.entityService.findMany(
      "api::appointment.appointment",
      {
        filters: {
          date: {
            $gte: tomorrow.toISOString(),
            $lte: endOfDay.toISOString(),
          },
          appointment_status: {
            $in: ["Pending", "Confirmed"],
          },
        },
        populate: ["patient"],
      }
    );

    return appointments;
  },
});
