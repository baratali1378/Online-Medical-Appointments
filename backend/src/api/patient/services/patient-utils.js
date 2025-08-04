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

    const doctor = await strapi.db.query("api::doctor.doctor").findOne({
      where: { id: doctorId },
      populate: {
        patients: {
          select: ["id"],
          populate: {
            personal_info: {
              select: ["fullname", "email", "gender", "birth"],
              populate: { image: { select: ["url"] } },
            },
            contact_details: {
              select: ["phone_number", "postal_code"],
            },
          },
        },
      },
    });

    return doctor?.patients || [];
  },
  async findById(patientId) {
    if (!patientId) throw new Error("Patient ID is required");

    return await strapi.db.query("api::patient.patient").findOne({
      where: { id: patientId },
      select: ["id"],
      populate: {
        personal_info: {
          select: ["fullname", "email", "gender", "birth"],
          populate: { image: { select: ["url"] } },
        },
        contact_details: {
          select: ["phone_number", "postal_code"],
          populate: { city: { select: ["name"] } },
        },
      },
    });
  },
};
