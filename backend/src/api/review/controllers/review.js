module.exports = {
  async findReviewsByDoctor(ctx) {
    try {
      const doctor = ctx.state.doctor;
      if (!doctor || !doctor.id) {
        return ctx.unauthorized("Doctor not authenticated");
      }

      const reviews = await strapi.entityService.findMany(
        "api::review.review",
        {
          filters: { doctor: doctor.id },
          populate: {
            patient: {
              populate: {
                personal_info: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
          },
        }
      );

      const sanitizedReviews = reviews.map((review) => {
        const { id, rating, comment, date } = review;

        // @ts-ignore
        const personalInfo = review.patient?.personal_info || {};
        const image = personalInfo.image;

        return {
          id,
          rating,
          comment,
          date,
          patient: {
            // @ts-ignore
            id: review.patient?.id,
            fullname: personalInfo.fullname || "Anonymous",
            image: image?.formats?.thumbnail?.url || image?.url || null,
          },
        };
      });

      return ctx.send({
        data: {
          reviews: sanitizedReviews,
        },
      });
    } catch (error) {
      console.error(error);
      return ctx.internalServerError("An error occurred while sending reviews");
    }
  },
};
