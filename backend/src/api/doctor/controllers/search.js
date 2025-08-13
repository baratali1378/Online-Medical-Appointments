"use strict";

module.exports = {
  async search(ctx) {
    try {
      const {
        city,
        specialty,
        searchQuery,
        page = 1,
        pageSize = 10,
      } = ctx.query;

      // Prevent empty search
      if (!city && !specialty && !searchQuery) {
        return ctx.send({
          success: true,
          message: "No search parameters provided",
          data: [],
          pagination: {
            page: 1,
            pageSize: 0,
            total: 0,
            totalPages: 0,
          },
        });
      }

      const filters = {};

      if (city) {
        filters.city = {
          name: { $containsi: city },
        };
      }

      if (specialty) {
        filters.specialties = {
          name: { $containsi: specialty },
        };
      }

      if (searchQuery) {
        filters.personal_info = {
          fullname: { $containsi: searchQuery },
        };
      }

      const doctors = await strapi.entityService.findMany(
        "api::doctor.doctor",
        {
          filters,
          fields: ["id"],
          populate: {
            city: { fields: ["name"] },
            specialties: { fields: ["name"] },
            personal_info: {
              fields: ["fullname"],
              populate: {
                image: {
                  fields: ["url"],
                },
              },
            },
          },
          start: (page - 1) * pageSize,
          limit: parseInt(pageSize, 10),
        }
      );

      const total = await strapi.entityService.count("api::doctor.doctor", {
        filters,
      });

      return ctx.send({
        success: true,
        message: doctors.length ? "Doctors found" : "No doctors found",
        pagination: {
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10),
          total,
          totalPages: Math.ceil(total / pageSize),
        },
        data: doctors,
      });
    } catch (error) {
      strapi.log.error("Doctor search error:", error);
      return ctx.send(
        {
          success: false,
          message: "Search failed",
          error: error.message || "Unexpected error",
        },
        500
      );
    }
  },
  async autocomplete(ctx) {
    try {
      const { query } = ctx.query;

      if (!query || query.length < 3) {
        return ctx.send({
          success: true,
          data: [],
          message: "Query too short (min 3 characters)",
        });
      }

      const doctors = await strapi.entityService.findMany(
        "api::doctor.doctor",
        {
          fields: ["id"],
          populate: {
            personal_info: {
              fields: ["fullname"],
              populate: { image: { fields: ["url"] } },
            },
            specialties: { fields: ["name"] },
          },
          filters: {
            personal_info: {
              fullname: { $containsi: query },
            },
          },
          limit: 10,
        }
      );

      const results = doctors.map((doctor) => ({
        id: doctor.id,
        // @ts-ignore
        name: doctor.personal_info?.fullname || "Unknown Doctor",
        // @ts-ignore
        image: doctor.personal_info?.image?.url || "/default-doctor.png",
        // @ts-ignore
        specialties: doctor.specialties?.map((s) => s.name) || [],
      }));

      return ctx.send({
        success: true,
        data: results,
        message: results.length ? "Results found" : "No matches",
      });
    } catch (err) {
      strapi.log.error("Doctor autocomplete error:", err);
      return ctx.send(
        {
          success: false,
          data: [],
          message: "Failed to fetch results",
          error: err.message || "Unexpected error",
        },
        500
      );
    }
  },
};
