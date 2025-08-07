"use strict";

module.exports = {
  async findTopRated(ctx) {
    try {
      const doctors = await strapi
        .service("api::doctor.top-rated")
        .getTopRatedDoctors();

      ctx.send({
        data: doctors,
      });
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};
