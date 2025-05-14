"use strict";

module.exports = {
  async search(ctx) {
    try {
      const { city, specialty } = ctx.query;

      const filters = {};

      if (city) {
        filters.city = {
          name: {
            $eqi: city,
          },
        };
      }

      if (specialty) {
        filters.specialties = {
          name: {
            $eqi: specialty,
          },
        };
      }

      const doctors = await strapi.entityService.findMany(
        "api::doctor.doctor",
        {
          filters,
          populate: {
            city: true,
            specialties: true,
            profile_picture: true,
          },
        }
      );

      if (!doctors || doctors.length === 0) {
        return ctx.notFound(
          "No doctors found matching the given city and specialty."
        );
      }

      return {
        success: true,
        count: doctors.length,
        data: doctors,
      };
    } catch (error) {
      strapi.log.error("Doctor search error:", error);
      return ctx.badRequest("Search failed.", {
        error: error.message || "Unexpected error",
      });
    }
  },
};
