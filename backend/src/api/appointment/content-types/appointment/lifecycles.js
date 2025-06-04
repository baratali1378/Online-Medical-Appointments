"use strict";

module.exports = {
  afterUpdate: async (event) => {
    const { result, params } = event;

    console.log("event", event);

    // Check if appointment_status was updated
    const updatedFields = params?.data;
    if (!("appointment_status" in updatedFields)) return;

    const status = updatedFields.appointment_status;
    const appointmentDate = updatedFields.updatedAt;

    try {
      // If updated by doctor (assumes ctx.state.doctor sets actor elsewhere)
      if (updatedFields.updatedByDoctor) {
        await strapi
          .service("api::notification.doctor-notification")
          .createNotification({
            message: `Doctor updated your appointment to '${status}' on ${appointmentDate}`,
            patientId: updatedFields.patientID,
          });
      }

      // If updated by patient
      else {
        await strapi
          .service("api::notification.patient-notification")
          .createNotification({
            message: `Patient updated appointment to '${status}' on ${appointmentDate}`,
            doctorId: updatedFields.id,
          });
      }
    } catch (error) {
      strapi.log.error(
        "Failed to send notification from appointment lifecycle:",
        error
      );
    }
  },
};
