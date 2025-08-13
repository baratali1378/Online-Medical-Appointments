"use strict";

module.exports = {
  async search(ctx) {
    try {
      const {
        city,
        specialty,
        searchQuery,
        verified = "false",
        minRating = 0,
        page = 1,
        pageSize = 10,
      } = ctx.query;

      const { doctors, pagination } = await strapi
        .service("api::doctor.search")
        .searchDoctors({
          city,
          specialty,
          searchQuery,
          verified,
          minRating,
          page,
          pageSize,
        });

      return ctx.send({
        success: true,
        message: doctors.length ? "Doctors found" : "No doctors found",
        pagination,
        data: doctors,
      });
    } catch (err) {
      strapi.log.error("Doctor search error:", err);
      return ctx.send(
        {
          success: false,
          message: "Search failed",
          error: err.message || "Unexpected error",
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
