module.exports = {
  async findPatientById(id) {
    return await strapi.db.query("api::patient.patient").findOne({
      where: { id },
      populate: {
        personal_info: { populate: ["image"] },
        contact_details: { populate: ["city"] },
        image: true,
        security: true,
      },
    });
  },
};
