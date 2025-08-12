// services/top-rated.js
"use strict";

module.exports = {
  async getTopRatedDoctors() {
    const doctors = await strapi.db.query("api::doctor.doctor").findMany({
      select: ["id"],
      populate: {
        reviews: {
          select: ["rating"], // only get ratings
        },
        personal_info: {
          select: ["fullname"],
          populate: {
            image: { select: ["url"] },
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

    const doctorsWithRatings = doctors.map((doc) => {
      const ratings = doc.reviews.map((r) => Number(r.rating) || 0);
      const reviewCount = ratings.length;
      const avgRating =
        reviewCount > 0
          ? ratings.reduce((sum, r) => sum + r, 0) / reviewCount
          : 0;

      return {
        id: doc.id,
        personal_info: doc.personal_info,
        specialties: doc.specialties,
        city: doc.city,
        security: doc.security,
        rating: Number(avgRating.toFixed(2)),
        reviewCount,
      };
    });

    const filtered = doctorsWithRatings.filter((d) => d.rating >= 3);

    const sorted = filtered.sort((a, b) => {
      if (b.rating === a.rating) {
        return b.reviewCount - a.reviewCount;
      }
      return b.rating - a.rating;
    });

    return sorted.slice(0, 10);
  },
};
