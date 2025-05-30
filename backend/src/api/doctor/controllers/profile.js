module.exports = {
  async me(ctx) {
    // doctor is already loaded and attached by middleware
    const doctor = ctx.state.doctor;

    if (!doctor) {
      return ctx.unauthorized("No doctor data available");
    }

    const {
      id,
      personal_info,
      phone_number,
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
        is_verified: security.is_verified || false,
      },
      meta: {},
    });
  },
};
