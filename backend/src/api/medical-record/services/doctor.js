const { NotFoundError } = require("@strapi/utils").errors;

module.exports = ({ strapi }) => ({
  async create(data) {
    return await strapi.entityService.create(
      "api::medical-record.medical-record",
      { data }
    );
  },

  async update(id, data) {
    return await strapi.entityService.update(
      "api::medical-record.medical-record",
      id,
      { data }
    );
  },

  async findByDoctor(doctorId) {
    return await strapi.entityService.findMany(
      "api::medical-record.medical-record",
      {
        filters: { doctor: doctorId },
        populate: ["patient", "appointment", "doctor"],
      }
    );
  },

  async findOne(id, { doctorId }) {
    const record = await strapi.entityService.findOne(
      "api::medical-record.medical-record",
      id,
      { populate: ["patient", "appointment", "doctor"] }
    );

    if (!record || record.doctor?.id !== doctorId) {
      throw new NotFoundError("Record not found or unauthorized");
    }

    return record;
  },
});
