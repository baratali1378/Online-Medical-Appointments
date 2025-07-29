const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::specialty.specialty",
  ({ strapi }) => ({
    async incrementViewByName(name) {
      try {
        // Find specialty by name (case-insensitive)
        const specialty = await strapi.db
          .query("api::specialty.specialty")
          .findOne({
            where: { name: name },
            select: ["id", "views"],
          });

        if (!specialty) {
          throw new Error(`Specialty "${name}" not found`);
        }

        // Update views
        return await strapi.db.query("api::specialty.specialty").update({
          where: { id: specialty.id },
          data: { views: specialty.views + 1 },
        });
      } catch (err) {
        strapi.log.error("Error incrementing views by name:", err);
        throw err;
      }
    },
  })
);
