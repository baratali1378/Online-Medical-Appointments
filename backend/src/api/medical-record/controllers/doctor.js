const { NotFoundError, ApplicationError } = require("@strapi/utils").errors;
const { sanitizeOutput } = require("../utils/sanitize");

module.exports = ({ strapi }) => {
  const recordService = strapi.service("api::medical-record.medical-record");

  return {
    async createMedicalRecord(ctx) {
      try {
        const doctor = ctx.state.doctor;
        if (!doctor) throw new NotFoundError("Doctor not found");

        const { appointmentId, patientId } = ctx.query;

        // Validate query params
        if (!appointmentId || !patientId) {
          throw new ApplicationError(
            "appointmentId and patientId are required in query params"
          );
        }

        // Verify appointment belongs to doctor + patient & is confirmed
        const appointment = await strapi.db
          .query("api::appointment.appointment")
          .findOne({
            where: {
              id: appointmentId,
              doctor: doctor.id,
              patient: patientId,
            },
            populate: ["doctor", "patient"],
          });

        if (!appointment) {
          throw new NotFoundError(
            "Appointment not found or you are not authorized"
          );
        }

        if (appointment.appointment_status !== "Confirmed") {
          throw new ApplicationError(
            "Medical record can only be created for confirmed appointments"
          );
        }

        // Extract body data (excluding files)
        const { files, ...bodyData } = ctx.request.body;

        // Create medical record without files first
        const createdRecord = await recordService.create({
          ...bodyData,
          doctor: doctor.id,
          patient: patientId,
          appointment: appointmentId,
        });

        // If files are uploaded, attach them
        if (ctx.request.files && ctx.request.files.files) {
          const uploadedFiles = Array.isArray(ctx.request.files.files)
            ? ctx.request.files.files
            : [ctx.request.files.files];

          await Promise.all(
            uploadedFiles.map((file) =>
              strapi
                .plugin("upload")
                .service("upload")
                .upload({
                  data: {
                    refId: createdRecord.id,
                    ref: "api::medical-record.medical-record",
                    field: "files",
                  },
                  files: file,
                })
            )
          );
        }

        return ctx.send({
          message: "Record created",
          data: {
            id: createdRecord.id,
          },
        });
      } catch (error) {
        strapi.log.error("Error creating medical record:", error);
        ctx.throw(500, error.message || "Failed to create record");
      }
    },
    async update(ctx) {
      try {
        const doctor = ctx.state.doctor;
        const { id } = ctx.params;

        const existing = await recordService.findOne(id, {
          doctorId: doctor.id,
        });
        if (!existing) {
          throw new NotFoundError("Record not found or unauthorized");
        }

        const updated = await recordService.update(id, ctx.request.body);
        return ctx.send({
          message: "Updated",
          data: await sanitizeOutput(updated, strapi),
        });
      } catch (error) {
        strapi.log.error("Error updating medical record:", error);
        return ctx.internalServerError("Failed to update the Medical Record");
      }
    },

    async find(ctx) {
      try {
        const doctor = ctx.state.doctor;
        const { patientId } = ctx.query;

        // Validate patientId
        if (!patientId) {
          return ctx.badRequest("Patient ID is required");
        }

        // Fetch records for doctor & patient
        const [records, total] = await Promise.all([
          recordService.findByDoctorAndPatient(doctor.id, Number(patientId)),
          strapi.db.query("api::medical-record.medical-record").count({
            where: {
              doctor: doctor.id,
              patient: Number(patientId),
            },
          }),
        ]);

        const sanitized = await Promise.all(
          records.map((r) => sanitizeOutput(r, strapi))
        );

        return ctx.send({
          data: sanitized,
          meta: {
            total,
            count: sanitized.length,
          },
        });
      } catch (error) {
        strapi.log.error("Error fetching medical records:", error);
        ctx.throw(500, error.message || "Failed to fetch records");
      }
    },
    async findOne(ctx) {
      try {
        const doctor = ctx.state.doctor;
        const { id } = ctx.params;

        const record = await recordService.findOne(id, { doctorId: doctor.id });

        return ctx.send({
          data: await sanitizeOutput(record, strapi),
        });
      } catch (error) {
        strapi.log.error("Error fetching a single medical record:", error);
        return ctx.internalServerError(error.status, error.message);
      }
    },
  };
};
