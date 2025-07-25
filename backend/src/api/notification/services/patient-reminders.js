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
          const patient = appointment.patient;

          // Safely access the email from the personal_info component
          const email = patient?.personal_info?.email;

          if (!email) {
            strapi.log.warn(`⚠️ No email found for patient ID ${patient?.id}`);
            continue;
          }

          await strapi.entityService.create("api::notification.notification", {
            data: {
              email, // now correctly set
              message: `You have an appointment scheduled on ${dayjs(appointment.date).format("YYYY-MM-DD HH:mm")}`,
              patient: patient.id,
            },
          });

          // Optionally, send to RabbitMQ here too
          await strapi.rabbitmq.channel.sendToQueue(
            "notifications",
            Buffer.from(
              JSON.stringify({
                email,
                subject: "Appointment Reminder",
                message: `You have an appointment scheduled on ${dayjs(appointment.date).format("YYYY-MM-DD HH:mm")}`,
              })
            ),
            { persistent: true }
          );
        } catch (err) {
          strapi.log.error(
            "Error creating notification or sending to queue:",
            err
          );
        }
      }

      strapi.log.info(`✅ Sent ${appointments.length} patient reminders.`);
      return { appointments: appointments.length };
    } catch (error) {
      strapi.log.error("❌ Error fetching appointments for reminders:", error);
    }
  },
});
