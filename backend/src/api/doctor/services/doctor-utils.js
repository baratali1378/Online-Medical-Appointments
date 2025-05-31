module.exports = () => ({
  async findDoctorById(id, populateFields = []) {
    if (!id) throw new Error("Doctor ID is required");

    return await strapi.db.query("api::doctor.doctor").findOne({
      where: { id },
      populate: {
        personal_info: {
          populate: ["image"],
        },
        phone_number: true,
        city: true,
        specialties: true,
        available_slots: true,
        verification: {
          populate: ["file"],
        },
        security: true,
        clinic_info: true,
        ...(populateFields || {}),
      },
    });
  },
});
