module.exports = {
  async me(ctx) {
    const doctor = ctx.state.doctor;

    if (!doctor) {
      return ctx.unauthorized("No doctor data available");
    }

    const {
      id,
      personal_info,
      city,
      specialties,
      biography,
      experience,
      available_slots,
      verification,
      security,
      clinic_info,
    } = doctor;

    return ctx.send({
      data: {
        id,
        personal_info,
        clinic_info,
        city,
        specialties,
        biography,
        experience,
        available_slots,
        verification,
        is_verified: security?.is_verified || false,
      },
      meta: {},
    });
  },

  // controllers/doctor.js
  async getDoctor(ctx) {
    try {
      const { id } = ctx.params;

      if (!id) {
        return ctx.badRequest("Doctor ID is required");
      }

      const doctor = await strapi.db.query("api::doctor.doctor").findOne({
        where: { id },
        select: ["id", "experience", "biography"],
        populate: {
          personal_info: {
            select: ["fullname", "email"],
            populate: {
              image: { select: ["url"] },
            },
          },
          city: { select: ["name"] },
          specialties: { select: ["name"] },
          available_slots: {
            select: [
              "id",
              "date",
              "start_time",
              "end_time",
              "capacity",
              "is_active",
              "price",
            ],
          },
          clinic_info: true,
          security: { select: ["is_verified"] },
          reviews: {
            select: ["rating", "comment", "date"],
            populate: {
              patient: {
                select: ["id"],
                populate: {
                  personal_info: {
                    select: ["fullname"],
                    populate: { image: { select: ["url"] } },
                  },
                },
              },
            },
          },
        },
      });

      if (!doctor) {
        return ctx.notFound("Doctor not found");
      }

      // Filter out past slots
      const now = new Date();
      doctor.available_slots = doctor.available_slots.filter((slot) => {
        if (!slot.date) return false;
        const slotDateTime = new Date(`${slot.date}T${slot.start_time}`);
        return slotDateTime >= now;
      });

      // Calculate ratings
      const ratings = doctor.reviews.map((r) => Number(r.rating) || 0);
      const reviewCount = ratings.length;
      const avgRating =
        reviewCount > 0
          ? ratings.reduce((sum, r) => sum + r, 0) / reviewCount
          : 0;

      return ctx.send({
        data: {
          doctor: doctor,
          rating: Number(avgRating.toFixed(2)),
          reviewCount,
        },
        meta: {},
      });
    } catch (error) {
      strapi.log.error(error);
      return ctx.internalServerError("Failed to fetch doctor data");
    }
  },
};
