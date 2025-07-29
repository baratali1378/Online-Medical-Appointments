const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::specialty.specialty",
  ({ strapi }) => ({
    async getTopSpecialties(ctx) {
      try {
        const { limit = 5 } = ctx.request.query;

        // Fetch specialties with doctors populated
        const specialties = await strapi.db
          .query("api::specialty.specialty")
          .findMany({
            orderBy: { views: "desc" },
            // @ts-ignore
            limit: parseInt(limit),
            select: ["id", "name", "views"],
            populate: {
              doctors: { select: ["id"] },
              icon: true,
            },
          });

        // Add doctor count to each specialty
        const formatted = specialties.map((spec) => ({
          id: spec.id,
          name: spec.name,
          views: spec.views,
          icon: spec.icon?.url || null,
          doctorCount: spec.doctors?.length || 0,
        }));

        return ctx.send({
          data: formatted,
        });
      } catch (err) {
        ctx.throw(500, "Failed to fetch top specialties");
      }
    },
  })
);
