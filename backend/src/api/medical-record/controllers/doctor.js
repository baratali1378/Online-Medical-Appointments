const { NotFoundError, ApplicationError } = require("@strapi/utils").errors;
const { sanitizeOutput } = require("../utils/sanitize");

module.exports = ({ strapi }) => {
  const recordService = strapi.service("api::medical-record.medical-record");

  // Whitelist fields allowed for update/create
  const allowedFields = [
    "chief_complaint",
    "symptoms",
    "diagnoses",
    "treatment_plan",
    "notes",
    "follow_up_required",
    "follow_up_date",
    "prescription",
  ];

  // Helper to pick allowed fields only
  const pickAllowedFields = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => allowedFields.includes(key))
    );
  };

  return {
    async createMedicalRecord(ctx) {
      try {
        const doctor = ctx.state.doctor;
        if (!doctor) throw new NotFoundError("Doctor not found");

        const { appointmentId, patientId } = ctx.query;

        if (!appointmentId || !patientId) {
          throw new ApplicationError(
            "appointmentId and patientId are required in query params"
          );
        }

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

        // Pick allowed fields only
        const filteredData = pickAllowedFields(bodyData);

        // Create record without files first
        const createdRecord = await recordService.create({
          ...filteredData,
          doctor: doctor.id,
          patient: patientId,
          appointment: appointmentId,
        });

        // Attach uploaded files (if any)
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

        // Check record exists
        const existing = await recordService.findOne(id, {
          doctorId: doctor.id,
        });
        if (!existing)
          throw new NotFoundError("Record not found or unauthorized");

        // Parse form data fields
        const filteredData = {};
        for (const key of allowedFields) {
          if (ctx.request.body[key] !== undefined) {
            // Convert string values to appropriate types
            if (key === "follow_up_required") {
              filteredData[key] = ctx.request.body[key] === "true";
            } else if (key === "follow_up_date") {
              filteredData[key] = new Date(ctx.request.body[key]);
            } else {
              filteredData[key] = ctx.request.body[key];
            }
          }
        }

        // Update text fields
        await recordService.update(id, filteredData);

        // Handle file uploads
        const uploadedFiles = [];
        if (ctx.request.files) {
          for (const key in ctx.request.files) {
            const fileOrFiles = ctx.request.files[key];
            if (Array.isArray(fileOrFiles)) {
              uploadedFiles.push(...fileOrFiles);
            } else {
              uploadedFiles.push(fileOrFiles);
            }
          }
        }

        if (uploadedFiles.length > 0) {
          await Promise.all(
            uploadedFiles.map((file) =>
              strapi
                .plugin("upload")
                .service("upload")
                .upload({
                  data: {
                    refId: id,
                    ref: "api::medical-record.medical-record",
                    field: "files",
                  },
                  files: file,
                })
            )
          );
        }

        // Return updated record
        const updated = await recordService.findOne(id);
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
