"use strict";

const patientService = require("../services/update");

module.exports = {
  async updateImg(ctx) {
    const patient = ctx.state.patient;
    if (!patient) return ctx.unauthorized("No patient data available");

    try {
      const imageFile = ctx.request.files?.files;
      const updatedPatient = await patientService.updateImage(
        patient,
        imageFile
      );

      return ctx.send({ data: updatedPatient, meta: {} });
    } catch (error) {
      strapi.log.error("Image update error:", error);
      return ctx.internalServerError(error.message || "Image update failed");
    }
  },

  async updateMe(ctx) {
    const patient = ctx.state.patient;
    if (!patient) return ctx.unauthorized("No patient data available");

    try {
      const data = ctx.request.body?.data;
      const updatedPatient = await patientService.updateProfile(patient, data);

      return ctx.send({
        data: {
          id: updatedPatient.id,
          personal_info: updatedPatient.personal_info,
          contact: updatedPatient.contact_details,
        },
        meta: {},
      });
    } catch (error) {
      strapi.log.error("Update error:", error);
      return ctx.internalServerError(
        error.message || "An error occurred during update"
      );
    }
  },
};
