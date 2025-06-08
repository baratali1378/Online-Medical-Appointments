"use strict";

const { ValidationError, NotFoundError } = require("@strapi/utils").errors;

module.exports = ({ strapi }) => ({
  async createMedicalRecord(ctx) {
    try {
      const doctor = ctx.state.doctor;
      if (!doctor) {
        throw new NotFoundError("Doctor profile not found");
      }

      const {
        appointment,
        chief_complaint,
        symptoms,
        diagnoses,
        treatment_plan,
        prescription,
        notes,
        follow_up_required,
        follow_up_date,
        patient,
        files,
      } = ctx.request.body;

      // Required validations
      if (!appointment || !chief_complaint || !patient) {
        throw new ValidationError("Missing required fields");
      }

      // Create medical record
      const newRecord = await strapi.entityService.create(
        "api::medical-record.medical-record",
        {
          data: {
            appointment,
            patient,
            doctor: doctor.id,
            chief_complaint,
            symptoms,
            diagnoses,
            treatment_plan,
            prescription,
            notes,
            follow_up_required,
            follow_up_date,
            files,
            publishedAt: new Date(), // optional for draft/publish
          },
        }
      );

      return ctx.send({
        message: "Medical record created successfully",
        data: newRecord,
      });
    } catch (error) {
      strapi.log.error("Error creating medical record:", error);
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        return ctx.badRequest(error.message);
      }
      return ctx.internalServerError("Could not create medical record");
    }
  },
});
