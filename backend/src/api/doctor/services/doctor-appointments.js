"use strict";

module.exports = ({ strapi }) => ({
  async getDoctorAppointments(doctor, filters = {}) {
    const { status, dateRange, search } = filters;

    const baseFilters = {
      doctor: Number(doctor.id),
    };

    if (dateRange) {
      baseFilters.date = {
        $gte: new Date(dateRange.start).toISOString(),
        $lte: new Date(dateRange.end).toISOString(),
      };
    }

    // ✅ Apply status filter only if it's not "all"
    if (status && status.toLowerCase() !== "all") {
      baseFilters.appointment_status = status;
    }

    // ✅ Search by patient name
    if (search) {
      baseFilters.patient = {
        personal_info: {
          fullname: {
            $containsi: search,
          },
        },
      };
    }

    const appointments = await strapi.entityService.findMany(
      "api::appointment.appointment",
      {
        filters: baseFilters,
        sort: { date: "asc" },
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

    // 🔒 Sanitize sensitive info
    const sanitized = appointments.map((appointment) => {
      if (appointment.patient) {
        delete appointment.patient.password;

        if (appointment.patient.personal_info) {
          const { fullname, gender, birth, image } =
            appointment.patient.personal_info;
          appointment.patient = { fullname, gender, birth, image };
        }
      }
      return appointment;
    });

    return sanitized;
  },
});
