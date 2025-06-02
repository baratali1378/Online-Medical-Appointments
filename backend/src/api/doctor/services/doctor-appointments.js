"use strict";
const { ApplicationError, NotFoundError } = require("@strapi/utils").errors;

module.exports = ({ strapi }) => ({
  async getDoctorAppointments(doctorId) {
    if (!doctorId) {
      throw new ApplicationError("Doctor ID is required");
    }

    // Check if doctor exists
    const doctor = await strapi.entityService.findOne(
      "api::doctor.doctor",
      Number(doctorId)
    );
    if (!doctor) {
      throw new NotFoundError(`Doctor with ID ${doctorId} not found`);
    }

    // Calculate date range: now to now + reminder window (e.g. 48h)
    const now = new Date();
    const endTime = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48 hours

    // Fetch appointments filtered by doctor and date range
    const appointments = await strapi.entityService.findMany(
      "api::appointment.appointment",
      {
        filters: {
          doctor: Number(doctorId),
          date: {
            $gte: now.toISOString(),
            $lte: endTime.toISOString(),
          },
        },
        populate: {
          patient: {
            populate: ["personal_info"],
          },
          medical_record: true,
          review: true,
          doctor: true,
        },
      }
    );

    return appointments;
  },
});
