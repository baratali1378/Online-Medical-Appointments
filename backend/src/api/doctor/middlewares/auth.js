"use strict";

const jwt = require("jsonwebtoken");

// @ts-ignore
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const authHeader = ctx.request.header.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ctx.unauthorized("No token provided");
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // @ts-ignore
      if (!decoded || !decoded.id) {
        return ctx.unauthorized("Invalid token");
      }

      const doctor = await strapi.db.query("api::doctor.doctor").findOne({
        // @ts-ignore
        where: { id: decoded.id },
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
        },
      });

      if (!doctor) {
        return ctx.notFound("Doctor not found");
      }

      ctx.state.doctor = doctor;
      await next();
    } catch (error) {
      strapi.log.error("JWT error:", error);
      return ctx.unauthorized("Invalid or expired token");
    }
  };
};
