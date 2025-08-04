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
  async findPatientsByDoctorId(doctorId) {
    if (!doctorId) throw new Error("Doctor ID is required");

    const patients = await strapi.db.query("api::patient.patient").findMany({
      where: {
        appointments: {
          doctor: doctorId,
        },
      },
      select: ["id"],
      populate: {
        personal_info: {
          select: ["fullname", "email", "gender", "birth"],
          populate: {
            image: {
              select: ["url"],
            },
          },
        },
        contact_details: {
          select: ["phone_number", "postal_code"],
        },
      },
    });
    return patients;
  },
};
