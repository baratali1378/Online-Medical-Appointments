const { NotFoundError, ApplicationError } = require("@strapi/utils").errors;
const { sanitizeOutput } = require("../utils/sanitize");

module.exports = ({ strapi }) => {
  const recordService = strapi.service("api::medical-record.medical-record");

  return {
    async createMedicalRecord(ctx) {
      try {
        const doctor = ctx.state.doctor;
        if (!doctor) throw new NotFoundError("Doctor not found");

        const data = { ...ctx.request.body, doctor: doctor.id };
        const created = await recordService.create(data);

        return ctx.send({
          message: "Record created",
          data: await sanitizeOutput(created, strapi),
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

        const existing = await recordService.findOne(id);
        if (!existing || existing.doctor.id !== doctor.id) {
          throw new NotFoundError("Record not found or unauthorized");
        }

        const updated = await recordService.update(id, ctx.request.body);
        return ctx.send({
          message: "Updated",
          data: sanitizeOutput(updated, strapi),
        });
      } catch (error) {
        strapi.log.error("Error updating medical record:", error);
        return ctx.internalServerError("Failed to update the Medical Record");
      }
    },

    async find(ctx) {
      try {
        const doctor = ctx.state.doctor;

        const [records, total] = await Promise.all([
          recordService.findByDoctor(doctor.id),
          strapi.db.query("api::medical-record.medical-record").count({
            where: { doctor: doctor.id },
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

        const record = await recordService.findOne(id, {
          doctorId: doctor.id,
        });

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
