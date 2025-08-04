"use strict";

module.exports = {
  async getPatients(ctx) {
    const doctor = ctx.state.doctor;
    if (!doctor) {
      return ctx.unauthorized("No doctor data available");
    }

    try {
      const patients = await strapi
        .service("api::patient.patient-utils")
        .findPatientsByDoctorId(doctor.id);

      return ctx.send({ data: patients });
    } catch (error) {
      console.error("Error fetching patients for doctor:", error);
      return ctx.internalServerError("Failed to retrieve patients");
    }
  },
};
