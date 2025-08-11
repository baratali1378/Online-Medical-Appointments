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
      rating,
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
        rating,
        available_slots,
        verification,
        is_verified: security?.is_verified || false,
      },
      meta: {},
    });
  },

  async getDoctor(ctx) {
    try {
      const { id } = ctx.params;

      if (!id) {
        return ctx.badRequest("Doctor ID is required");
      }

      const doctor = await strapi.db.query("api::doctor.doctor").findOne({
        where: { id },
        select: ["id", "rating", "experience", "reviewCount"],
        populate: {
          personal_info: {
            select: ["fullname", "email"],
            populate: {
              image: {
                select: ["url"],
              },
            },
          },
          city: {
            select: ["name"],
          },
          specialties: {
            select: ["name"],
          },
          available_slots: {
            select: ["date", "start_time", "end_time", "capacity", "is_active"],
          },
          clinic_info: true,
          security: {
            select: ["is_verified"],
          },
          reviews: {
            select: ["rating", "comment", "date"],
            populate: {
              patient: {
                select: ["id"],
                populate: {
                  personal_info: {
                    select: ["fullname"],
                    populate: {
                      image: {
                        select: ["url"],
                      },
                    },
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

      return ctx.send({
        data: {
          doctor: doctor,
        },
        meta: {},
      });
    } catch (error) {
      strapi.log.error(error);
      return ctx.internalServerError("Failed to fetch doctor data");
    }
  },
};
