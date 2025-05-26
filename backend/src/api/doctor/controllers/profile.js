const jwt = require("jsonwebtoken");

module.exports = {
  async me(ctx) {
    const authHeader = ctx.request.header.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ctx.unauthorized("No token provided");
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof decoded !== "object" || !decoded.id) {
        return ctx.unauthorized("Invalid token payload");
      }

      const doctor = await strapi.db.query("api::doctor.doctor").findOne({
        where: { id: decoded.id },
        populate: {
          personal_info: {
            populate: ["image"],
          },
          phone_number: true,
          city: true,
          specialties: true,
          available_slots: true,
          verification: true,
          security: true,
        },
      });

      if (!doctor) {
        return ctx.notFound("Doctor not found");
      }

      const {
        id,
        personal_info,
        phone_number,
        city,
        specialties,
        biography,
        experience,
        rating,
        available_slots,
        verification,
        security,
      } = doctor;

      return ctx.send({
        data: {
          id,
          personal_info,
          phone_number,
          city,
          specialties,
          biography,
          experience,
          rating,
          available_slots,
          verification,
          is_verified: security.is_verified || false,
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
