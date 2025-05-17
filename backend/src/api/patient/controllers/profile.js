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
          image: true,
        },
      });

      if (!patient) {
        return ctx.notFound("Patient not found");
      }

      // Return patient data without sensitive information
      return ctx.send({
        data: {
          id: patient.id,
          fullname: patient.fullname,
          email: patient.email,
          phone: patient.phone,
          birth: patient.birth,
          gender: patient.gender,
          slug_id: patient.slug_id,
          image: patient.image,
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
