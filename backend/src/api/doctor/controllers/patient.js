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
  async getPatientById(ctx) {
    const doctor = ctx.state.doctor;
    const { id } = ctx.params;

    if (!doctor) return ctx.unauthorized("No doctor data available");
    if (!id) return ctx.badRequest("Patient ID is required");

    try {
      // Fetch patient
      const patient = await strapi
        .service("api::patient.patient-utils")
        .findById(id);

      if (!patient) {
        return ctx.notFound("Patient not found");
      }

      return ctx.send({ data: patient });
    } catch (error) {
      console.error("Error fetching patient by ID:", error);
      return ctx.internalServerError("Failed to retrieve patient details");
    }
  },
};
