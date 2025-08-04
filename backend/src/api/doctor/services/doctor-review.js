module.exports = () => ({
  async getDoctorReviewsWithStats(doctorId) {
    if (!doctorId) throw new Error("Doctor ID is required");

    const reviews = await strapi.entityService.findMany("api::review.review", {
      filters: { doctor: doctorId },
      populate: {
        patient: {
          populate: {
            personal_info: {
              populate: { image: true },
            },
            contact_details: {
              populate: {
                city: true,
              },
            },
          },
        },
      },
    });

    // Sanitize and shape data
    const sanitizedReviews = reviews.map((review) => {
      // @ts-ignore
      const personalInfo = review.patient?.personal_info || {};
      const image = personalInfo.image;
      // @ts-ignore
      const contact_details = review.patient?.contact_details || {};

      return {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        date: review.date,
        patient: {
          // @ts-ignore
          id: review.patient?.id,
          fullname: personalInfo.fullname || "Anonymous",
          image: image?.formats?.thumbnail?.url || image?.url || null,
          city: contact_details.city.name,
        },
      };
    });

    // Stats
    const totalReviews = reviews.length;
    const sumRatings = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    const averageRating =
      totalReviews > 0
        ? parseFloat((sumRatings / totalReviews).toFixed(1))
        : null;

    const ratingBreakdown = [1, 2, 3, 4, 5].reduce((acc, star) => {
      acc[star] = reviews.filter((r) => r.rating === star).length;
      return acc;
    }, {});

    return {
      reviews: sanitizedReviews,
      totalReviews,
      averageRating,
      ratingBreakdown,
    };
  },
});
