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
        fields: [
          "id",
          "date",
          "appointment_status",
          "notes",
          "price",
          "payment_status",
        ],
        populate: {
          patient: {
            fields: ["id"],
            populate: {
              personal_info: {
                fields: ["fullname", "birth", "gender"],
                populate: {
                  image: {
                    fields: ["url"],
                  },
                },
              },
            },
          },
        },
      }
    );

    return appointments;
  },
});
