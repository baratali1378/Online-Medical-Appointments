"use strict";

module.exports = {
  async getTopRatedDoctors() {
    // 1️⃣ Get all doctors with their reviews
    const doctors = await strapi.db.query("api::doctor.doctor").findMany({
      populate: {
        reviews: {
          select: ["rating"],
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

    console.log(doctors);

    // 2️⃣ Calculate rating and reviewCount dynamically
    const doctorsWithRatings = doctors.map((doc) => {
      const ratings = doc.reviews.map((r) => Number(r.rating) || 0);
      const reviewCount = ratings.length;
      const avgRating =
        reviewCount > 0
          ? ratings.reduce((sum, r) => sum + r, 0) / reviewCount
          : 0;

      return {
        ...doc,
        rating: Number(avgRating.toFixed(2)),
        reviewCount,
      };
    });

    // 3️⃣ Filter only doctors with rating >= 3
    const filtered = doctorsWithRatings.filter((d) => d.rating >= 3);

    // 4️⃣ Sort by rating DESC, then reviewCount DESC
    const sorted = filtered.sort((a, b) => {
      if (b.rating === a.rating) {
        return b.reviewCount - a.reviewCount;
      }
      return b.rating - a.rating;
    });

    // 5️⃣ Take top 10
    return sorted.slice(0, 10);
  },
};
