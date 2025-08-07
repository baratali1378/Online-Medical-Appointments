"use strict";

module.exports = {
  async getTopRatedDoctors() {
    // Fetch doctors with rating between 3 and 5, populate reviews (just IDs)
    const doctors = await strapi.db.query("api::doctor.doctor").findMany({
      where: {
        rating: {
          $gte: 3,
          $lte: 5,
        },
        reviews: {
          id: {
            $notNull: true,
          },
        },
      },
      orderBy: { rating: "desc" },
      populate: {
        personal_info: true,
        specialties: true,
        city: true,
        reviews: {
          fields: ["id"],
        },
      },
    });

    // Filter doctors with more than 20 reviews, limit to top 5
    const filteredDoctors = doctors
      .filter((doctor) => doctor.reviews && doctor.reviews.length > 20)
      .slice(0, 20);

    return filteredDoctors;
  },
};
