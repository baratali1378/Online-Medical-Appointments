// src/api/review/controllers/review.js

module.exports = {
  async findReviewsByDoctor(ctx) {
    try {
      const doctor = ctx.state.doctor;
      if (!doctor || !doctor.id) {
        return ctx.unauthorized("Doctor not authenticated");
      }

      const result = await strapi
        .service("api::doctor.doctor-review")
        .getDoctorReviewsWithStats(doctor.id);

      return ctx.send({
        data: result,
      });
    } catch (error) {
      console.error(error);
      return ctx.internalServerError(
        "An error occurred while fetching reviews"
      );
    }
  },
};
