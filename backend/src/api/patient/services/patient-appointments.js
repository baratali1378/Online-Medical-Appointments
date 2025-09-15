"use strict";

module.exports = ({ strapi }) => ({
  async getPatientAppointments(patient, filters = {}) {
    const { status, search } = filters;

    const baseFilters = {
      patient: Number(patient.id),
    };

    // ✅ Apply status filter if provided (not "all")
    if (status && status.toLowerCase() !== "all") {
      baseFilters.appointment_status = status;
    }

    // ✅ Search by doctor name (optional)
    if (search) {
      baseFilters.doctor = {
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
        sort: { date: "desc" },
        populate: {
          doctor: {
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

    // 🔒 Sanitize output (return only doctor id, fullname, gender, image URL)
    const sanitized = appointments.map((appointment) => {
      if (appointment.doctor?.personal_info) {
        const doctorId = appointment.doctor.id; // ✅ Get doctor ID
        const { fullname, gender, image } = appointment.doctor.personal_info;
        appointment.doctor = {
          id: doctorId, // ✅ Include doctor ID
          fullname,
          gender,
          image: image?.url || null, // ✅ Only URL
        };
      }
      return appointment;
    });

    return sanitized;
  },
});
