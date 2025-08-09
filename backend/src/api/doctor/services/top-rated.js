"use strict";

module.exports = {
  async getTopRatedDoctors() {
    const topDoctors = await strapi.db.query("api::doctor.doctor").findMany({
      where: {
        rating: { $gte: 3 },
      },
      orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
      limit: 10,
      select: ["id", "rating", "reviewCount"],
      populate: {
        personal_info: {
          select: ["fullname"],
          populate: {
            image: {
              select: ["url"],
            },
          },
        },
        specialties: {
          select: ["name"],
        },
        city: {
          select: ["name"],
        },
        security: {
          select: ["is_verified"],
        },
      },
    });
    return topDoctors;
  },
};
