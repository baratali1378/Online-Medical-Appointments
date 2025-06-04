"use strict";

const dayjs = require("dayjs");

module.exports = ({ strapi }) => ({
  async sendPatientReminders() {
    try {
      const appointments = await strapi
        .service("api::appointment.patient-reminder")
        .getAppointmentsForReminders();

      if (!appointments || appointments.length === 0) {
        return { appointments: 0 };
      }

      for (const appointment of appointments) {
        try {
          await strapi.entityService.create("api::notification.notification", {
            data: {
              message: `You have an appointment scheduled on ${dayjs(appointment.date).format("YYYY-MM-DD HH:mm")}`,
              patient: appointment.patient.id,
            },
          });

          // ✅ Redis publish is now handled in the lifecycle hook
        } catch (err) {
          strapi.log.error("Error creating notification:", err);
        }
      }

      strapi.log.info(`Sent ${appointments.length} patient reminders.`);
      return { appointments: appointments.length };
    } catch (error) {
      strapi.log.error("Error fetching appointments for reminders:", error);
    }
  },
});
