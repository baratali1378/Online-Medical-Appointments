"use strict";
const { NotFoundError } = require("@strapi/utils").errors;

module.exports = ({ strapi }) => ({
  async getDoctorAppointments(ctx) {
    try {
      const doctor = ctx.state.doctor;
      if (!doctor) {
        throw new NotFoundError("Doctor profile not found");
      }

      const { status, startDate, endDate, search } = ctx.query;
      console.log(ctx.query);

      const isValidDate = (d) => !isNaN(new Date(d).getTime());

      const dateRange =
        isValidDate(startDate) && isValidDate(endDate)
          ? { start: startDate, end: endDate }
          : undefined;

      const appointments = await strapi
        .service("api::doctor.doctor-appointments")
        .getDoctorAppointments(doctor, {
          status,
          dateRange,
          search,
        });

      return ctx.send({
        data: appointments,
        doctor: doctor.personal_info,
        meta: {
          count: appointments.length,
          filters: {
            status: status || "all",
            dateRange:
              dateRange != null
                ? `${dateRange.start} to ${dateRange.end}`
                : "none",
            search: search || "none",
          },
        },
      });
    } catch (error) {
      strapi.log.error("Error fetching doctor appointments:", error);
      if (error instanceof NotFoundError) {
        return ctx.notFound(error.message);
      }
      return ctx.internalServerError("Could not fetch appointments");
    }
  },
  async changeAppointmentStatus(ctx) {
    try {
      const doctor = ctx.state.doctor;
      if (!doctor) {
        throw new NotFoundError("Doctor profile not found");
      }

      const { id, status } = ctx.request.body;

      if (!id || !status) {
        return ctx.badRequest("Appointment ID and new status are required");
      }

      const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
      if (!validStatuses.includes(status)) {
        return ctx.badRequest("Invalid appointment status");
      }

      const appointment = await strapi.entityService.findOne(
        "api::appointment.appointment",
        id,
        { populate: { doctor: true } }
      );

      if (!appointment) {
        throw new NotFoundError("Appointment not found");
      }

      if (appointment.doctor?.id !== doctor.id) {
        return ctx.unauthorized(
          "You are not allowed to update this appointment"
        );
      }

      const updatedAppointment = await strapi.entityService.update(
        "api::appointment.appointment",
        id,
        {
          data: {
            appointment_status: status,
          },
        }
      );

      return ctx.send({
        message: "Appointment status updated successfully",
        data: updatedAppointment,
      });
    } catch (error) {
      strapi.log.error("Error updating appointment status:", error);
      if (error instanceof NotFoundError) {
        return ctx.notFound(error.message);
      }
      return ctx.internalServerError("Could not update appointment status");
    }
  },
});
