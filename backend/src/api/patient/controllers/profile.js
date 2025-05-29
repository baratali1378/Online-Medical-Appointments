module.exports = {
  async me(ctx) {
    const patient = ctx.state.patient;

    if (!patient) {
      return ctx.unauthorized("No patient data available");
    }
    try {
      const { personal_info, contact_details } = patient;

      return ctx.send({
        data: {
          id: patient.id,
          personal_info: personal_info,
          contact: contact_details,
        },
        meta: {},
      });
    } catch (error) {
      strapi.log.error("JWT verify error:", error);
      if (error.name === "TokenExpiredError") {
        return ctx.unauthorized("Token expired");
      }
      return ctx.unauthorized("Invalid token");
    }
  },
};
