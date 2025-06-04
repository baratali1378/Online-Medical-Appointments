"use strict";

module.exports = {
  async getPatients(ctx) {
    // doctor is already loaded and attached by middleware
    const doctor = ctx.state.doctor;

    if (!doctor) {
      return ctx.unauthorized("No doctor data available");
    }

    try {
      // Step 1: Find all appointments for this doctor
      const appointments = await strapi.entityService.findMany(
        "api::appointment.appointment",
        {
          filters: {
            doctor: doctor.id,
          },
          populate: {
            patient: {
              populate: {
                personal_info: true,
                contact_details: true,
              },
            },
          },
        }
      );

      // Step 2: Extract unique patients from appointments
      const patientMap = new Map();

      for (const appointment of appointments) {
        const patient = appointment.patient;
        if (patient && !patientMap.has(patient.id)) {
          patientMap.set(patient.id, patient);
        }
      }

      // Step 3: Return the list of unique patients
      const uniquePatients = Array.from(patientMap.values());

      return ctx.send({
        data: uniquePatients,
      });
    } catch (error) {
      console.error("Error fetching patients for doctor:", error);
      return ctx.internalServerError("Failed to retrieve patients");
    }
  },
};
