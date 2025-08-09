const doctorToken = require("../../../utils/service/auth-service");

module.exports = {
  async getAllDoctorTokens(ctx) {
    try {
      // Fetch all doctors with just the fields we need
      const doctors = await strapi.entityService.findMany(
        "api::patient.patient",
        {
          fields: ["id"],
          populate: {
            personal_info: { fields: ["email"] },
          },
        }
      );

      // Map doctors to id + token
      const result = doctors.map((doctor) => ({
        id: doctor.id,
        token: doctorToken.generateToken(doctor, "patient"),
      }));

      return ctx.send(result);
    } catch (err) {
      strapi.log.error("Error generating doctor tokens:", err);
      return ctx.internalServerError("Failed to get doctor tokens");
    }
  },
};
