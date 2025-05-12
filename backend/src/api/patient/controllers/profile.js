const jwt = require("jsonwebtoken");

module.exports = {
  async me(ctx) {
    const authHeader = ctx.request.header.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ctx.unauthorized("No token provided");
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      );

      if (typeof decoded !== "object" || !("id" in decoded)) {
        return ctx.unauthorized("Invalid token payload");
      }

      const patient = await strapi.db.query("api::patient.patient").findOne({
        where: { id: decoded.id },
        populate: {
          image: true,
          appointments: {
            populate: {
              doctor: {
                populate: ["fullname", "specialty"], // optional nested doctor info
              },
            },
          },
          reviews: {
            populate: {
              doctor: true,
            },
          },
        },
      });

      if (!patient) {
        return ctx.notFound("Patient not found");
      }

      return ctx.send({
        id: patient.id,
        fullname: patient.fullname,
        email: patient.email,
        phone: patient.phone,
        birth: patient.birth,
        gender: patient.gender,
        slug_id: patient.slug_id,
        image: patient.image,
        appointments: patient.appointments,
        reviews: patient.reviews,
      });
    } catch (error) {
      strapi.log.error("JWT verify error:", error);
      return ctx.unauthorized("Invalid or expired token");
    }
  },
};
