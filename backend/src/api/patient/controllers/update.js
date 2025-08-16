"use strict";

const patientService = require("../services/update");
const { UnauthorizedError } = require("../../../utils/error");

module.exports = {
  async updateImg(ctx) {
    const patient = ctx.state.patient;
    if (!patient) {
      return new UnauthorizedError("Patient Not Found");
    }

    try {
      const imageFile = ctx.request.files?.files;
      const updatedPatient = await patientService.updateImage(
        patient,
        imageFile
      );

      return ctx.send({ data: updatedPatient, meta: {} });
    } catch (err) {
      strapi.log.error("Image update error:", err);

      ctx.status = err.status || 500;
      ctx.body = {
        error: err.message || "Image update failed",
        type: err.name || "InternalServerError",
      };
    }
  },

  async updateMe(ctx) {
    const patient = ctx.state.patient;
    if (!patient) {
      return new UnauthorizedError("invalid Patient");
    }

    try {
      const data = ctx.request.body?.data;
      const updatedPatient = await patientService.updateProfile(patient, data);

      return ctx.send({
        data: {
          id: updatedPatient.id,
          // @ts-ignore
          personal_info: updatedPatient.personal_info,
          // @ts-ignore
          contact: updatedPatient.contact_details,
        },
        meta: {},
      });
    } catch (err) {
      strapi.log.error("Update error:", err);

      ctx.status = err.status || 500;
      ctx.body = {
        error: err.message || "An error occurred during update",
        type: err.name || "InternalServerError",
      };
    }
  },
};
