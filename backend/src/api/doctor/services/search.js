"use strict";

const calculateDoctorRatings = (doctor) => {
  const ratings = (doctor.reviews || []).map((r) => Number(r.rating) || 0);
  const reviewCount = ratings.length;
  const avgRating =
    reviewCount > 0 ? ratings.reduce((sum, r) => sum + r, 0) / reviewCount : 0;

  return {
    id: doctor.id,
    personal_info: doctor.personal_info,
    specialties: doctor.specialties,
    city: doctor.city,
    security: doctor.security,
    rating: Number(avgRating.toFixed(2)),
    reviewCount,
  };
};

module.exports = {
  async searchDoctors({
    city,
    specialty,
    searchQuery,
    verified,
    minRating,
    page,
    pageSize,
  }) {
    const filters = {};

    if (city) filters.city = { name: { $containsi: city } };
    if (specialty) filters.specialties = { name: { $containsi: specialty } };
    if (searchQuery)
      filters.personal_info = { fullname: { $containsi: searchQuery } };
    if (verified === "true") filters.security = { is_verified: true };

    // Fetch matching doctors
    const doctors = await strapi.entityService.findMany("api::doctor.doctor", {
      filters,
      populate: {
        reviews: { fields: ["rating"] },
        personal_info: {
          fields: ["fullname"],
          populate: { image: { fields: ["url"] } },
        },
        specialties: { fields: ["name"] },
        city: { fields: ["name"] },
        security: { fields: ["is_verified"] },
      },
      start: (page - 1) * pageSize,
      limit: parseInt(pageSize, 10),
    });

    let doctorsWithRatings = doctors.map(calculateDoctorRatings);

    if (Number(minRating) > 0) {
      doctorsWithRatings = doctorsWithRatings.filter(
        (d) => d.rating >= Number(minRating)
      );
    }

    // Count total matching doctors
    const total = await strapi.entityService.count("api::doctor.doctor", {
      filters,
    });

    return {
      doctors: doctorsWithRatings,
      pagination: {
        page: parseInt(page, 10),
        pageSize: parseInt(pageSize, 10),
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  },
};
