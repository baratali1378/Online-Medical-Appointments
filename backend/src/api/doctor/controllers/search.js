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
  async autocomplete(ctx) {
    try {
      const { query } = ctx.query;

      // Validate input
      if (!query || query.length < 3) {
        return ctx.send({
          success: true,
          data: [],
          message: "Query too short (min 3 characters)",
        });
      }

      // Fetch doctors with personal_info and specialties
      const doctors = await strapi.entityService.findMany(
        "api::doctor.doctor",
        {
          fields: ["id"],
          populate: {
            personal_info: {
              fields: ["fullname"],
              populate: { image: true },
            },
            specialties: {
              fields: ["name"],
            },
          },
          filters: {
            personal_info: {
              fullname: {
                $containsi: query,
              },
            },
          },
          limit: 10,
        }
      );

      // Format results
      const results = doctors.map((doctor) => ({
        id: doctor.id,
        // @ts-ignore
        name: doctor.personal_info?.fullname || "Unknown Doctor",
        // @ts-ignore
        image: doctor.personal_info?.image?.url
          ? // @ts-ignore
            `${doctor.personal_info.image.url}`
          : "/default-doctor.png",
        specialties:
          // @ts-ignore
          doctor.specialties?.map((s) => s.name) || [], // Return as array
      }));

      return ctx.send({
        success: true,
        data: results,
      });
    } catch (err) {
      strapi.log.error("Doctor autocomplete error:", err);
      return ctx.send(
        {
          success: false,
          data: [],
          message: "Failed to fetch results",
        },
        500
      );
    }
  },
};
