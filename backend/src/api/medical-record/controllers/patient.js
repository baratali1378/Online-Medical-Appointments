const { NotFoundError } = require("@strapi/utils").errors;
const { sanitizeOutput } = require("../utils/sanitize");

module.exports = ({ strapi }) => {
  const recordService = strapi.service("api::medical-record.medical-record");

  return {
    async findMyRecords(ctx) {
      const patient = ctx.state.patient;
      if (!patient) throw new NotFoundError("Patient not found");

      const records = await recordService.findByPatient(patient.id);
      return ctx.send(await Promise.all(records.map((r) => sanitizeOutput(r))));
    },
  };
};
