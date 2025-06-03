"use strict";

const dayjs = require("dayjs");

module.exports = ({ strapi }) => ({
  async sendPatientReminders() {
    try {
      const appointments = await strapi
        .service("api::appointment.patient-reminder")
        .getAppointmentsForReminders();

      if (!appointments) {
        return { appointments: 0 };
      }

      for (const appointment of appointments) {
        try {
          // Create notification in Strapi DB
          const notification = await strapi.entityService.create(
            "api::notification.notification",
            {
              data: {
                message: `You have an appointment scheduled on ${dayjs(appointment.date).format("YYYY-MM-DD HH:mm")}`,
                // @ts-ignore
                patient: appointment.patient.id,
              },
            }
          );

          // Publish notification event to Redis
          await strapi.redis.publish(
            "notifications",
            JSON.stringify({
              id: notification.id,
              userType: "patient",
              userId: appointment.patient.id,
              message: notification.message,
            })
          );
        } catch (innerError) {
          strapi.log.error(
            "Error creating notification or publishing to Redis:",
            innerError
          );
        }
      }
      strapi.log.info("appointments ", appointments);
      return { appointments: appointments.length };
    } catch (error) {
      strapi.log.error("Error fetching appointments for reminders:", error);
    }
  },
});
