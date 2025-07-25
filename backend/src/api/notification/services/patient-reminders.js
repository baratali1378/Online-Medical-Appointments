"use strict";

const dayjs = require("dayjs");

module.exports = ({ strapi }) => ({
  async sendPatientReminders() {
    try {
      const appointments = await strapi
        .service("api::appointment.patient-reminder")
        .getAppointmentsForReminders();

      console.log("appointments", appointments);

      if (!appointments || appointments.length === 0) {
        return { appointments: 0 };
      }

      for (const appointment of appointments) {
        try {
          const patient = appointment.patient;
          const doctor = appointment.doctor;

          // Get email from patient's personal_info
          const email = patient?.personal_info?.email;
          const doctorName = doctor?.personal_info
            ? `${doctor.personal_info.first_name} ${doctor.personal_info.last_name}`
            : "your doctor";

          if (!email) {
            strapi.log.warn(`⚠️ No email found for patient ID ${patient?.id}`);
            continue;
          }

          const formattedDate = dayjs(appointment.date).format(
            "dddd, MMMM D, YYYY [at] HH:mm"
          );

          const message =
            `Dear ${patient.personal_info?.first_name || "Patient"},\n\n` +
            `This is a friendly reminder that you have an appointment with Dr. ${doctorName} on ${formattedDate}.\n\n` +
            `Please make sure to be available on time. If you have any questions or need to reschedule, contact the clinic or your doctor in advance.\n\n` +
            `Thank you,\nOnline Medical Appointment System`;

          await strapi.entityService.create("api::notification.notification", {
            data: {
              email,
              message,
              patient: patient.id,
            },
          });

          await strapi.rabbitmq.publishToQueue({
            email,
            subject: "Appointment Reminder",
            content: message,
          });
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
