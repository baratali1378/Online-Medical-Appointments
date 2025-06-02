"use strict";
const { NotFoundError } = require("@strapi/utils").errors;

module.exports = ({ strapi }) => ({
  async getDoctorAppointments(ctx) {
    try {
      const doctorId = ctx.params.doctorId || ctx.query.doctorId;
      if (!doctorId) {
        return ctx.badRequest("doctorId is required");
      }

      const appointments = await strapi
        .service("api::doctor.doctor-appointments")
        .getDoctorAppointments(doctorId);

      return ctx.send(appointments);
    } catch (error) {
      strapi.log.error("Error fetching doctor appointments:", error);

      if (error instanceof NotFoundError) {
        return ctx.notFound(error.message);
      }

      return ctx.internalServerError("Could not fetch appointments");
    }
  },
});
