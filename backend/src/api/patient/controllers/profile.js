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

      const patient = await strapi.db.query("api::patient.patient").findOne({
        where: { id: decoded.id },
        populate: {
          personal_info: {
            populate: ["image"],
          },
          contact_details: {
            populate: ["city"],
          },
          security: true,
          image: true,
        },
      });

      if (!patient) {
        return ctx.notFound("Patient not found");
      }

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
