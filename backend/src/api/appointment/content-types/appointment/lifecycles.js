"use strict";

const dayjs = require("dayjs");

module.exports = {
  afterUpdate: async (event) => {
    const { result, params } = event;
    const updatedFields = params?.data;

    // Only proceed if appointment_status changed
    if (!("appointment_status" in updatedFields)) return;

    const status = updatedFields.appointment_status;
    const appointmentDate = result.date;

    try {
      // Load full appointment details
      const appointment = await strapi.db
        .query("api::appointment.appointment")
        .findOne({
          where: { id: result.id },
          populate: {
            patient: { populate: ["personal_info"] },
            doctor: { populate: ["personal_info"] },
          },
        });

      const patient = appointment.patient;
      const doctor = appointment.doctor;
      const formattedDate = dayjs(appointmentDate).format(
        "dddd, MMMM D, YYYY [at] HH:mm"
      );

      if (updatedFields.updatedByDoctor) {
        // ➤ Notify Patient
        const message = `Your doctor has updated the status of your appointment scheduled on ${formattedDate} to "${status}".`;

        await strapi
          .service("api::notification.doctor-notification")
          .createNotification({
            message,
            patientId: patient.id,
          });

        const email = patient?.personal_info?.email;
        if (email) {
          // @ts-ignore
          await strapi.rabbitmq.publishToQueue({
            email,
            subject: "Your Appointment Has Been Updated",
            content: `Dear ${patient.personal_info.first_name || "Patient"},\n\nYour doctor has updated the status of your appointment scheduled on ${formattedDate}.\n\nNew status: "${status}".\n\nIf you have any questions, please contact your doctor.\n\nThank you,\nOnline Medical Appointment System`,
          });
        }
      } else {
        // ➤ Notify Doctor
        const message = `Your patient has updated the status of the appointment scheduled on ${formattedDate} to "${status}".`;

        await strapi
          .service("api::notification.patient-notification")
          .createNotification({
            message,
            doctorId: doctor.id,
          });

        const email = doctor?.personal_info?.email;
        if (email) {
          // @ts-ignore
          await strapi.rabbitmq.publishToQueue({
            email,
            subject: "Appointment Update from Patient",
            content: `Dear Dr. ${doctor.personal_info.last_name || "Doctor"},\n\nYour patient has updated the status of the appointment scheduled on ${formattedDate}.\n\nNew status: "${status}".\n\nPlease log in to your dashboard for more details.\n\nSincerely,\nOnline Medical Appointment System`,
          });
        }
      }
    } catch (error) {
      strapi.log.error(
        "❌ Failed to send notification or email on appointment update:",
        error
      );
    }
  },
};
