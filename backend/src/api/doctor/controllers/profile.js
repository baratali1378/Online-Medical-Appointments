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
        populate: {
          personal_info: true,
          city: true,
          specialties: true,
          available_slots: true,
          verification: true,
          clinic_info: true,
          security: true,
        },
      });

      if (!doctor) {
        return ctx.notFound("Doctor not found");
      }

      return ctx.send({
        data: {
          id: doctor.id,
          personal_info: doctor.personal_info,
          clinic_info: doctor.clinic_info,
          city: doctor.city,
          specialties: doctor.specialties,
          biography: doctor.biography,
          experience: doctor.experience,
          rating: doctor.rating,
          available_slots: doctor.available_slots,
          verification: doctor.verification,
          is_verified: doctor.security?.is_verified || false,
        },
        meta: {},
      });
    } catch (error) {
      strapi.log.error(error);
      return ctx.internalServerError("Failed to fetch doctor data");
    }
  },
};
