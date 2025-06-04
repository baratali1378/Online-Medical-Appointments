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

      // First verify the appointment exists and belongs to this doctor
      const existingAppointment = await strapi.db
        .query("api::appointment.appointment")
        .findOne({
          where: { id },
          populate: ["doctor", "patient"],
        });

      if (!existingAppointment) {
        throw new NotFoundError("Appointment not found");
      }

      if (existingAppointment.doctor?.id !== doctor.id) {
        return ctx.unauthorized(
          "You are not allowed to update this appointment"
        );
      }

      // Perform the update using db.query
      const updatedAppointment = await strapi.db
        .query("api::appointment.appointment")
        .update({
          where: { id },
          data: {
            appointment_status: status,
            updatedByDoctor: true,
            updatedAt: new Date(), // Explicit timestamp
          },
          populate: ["patient", "doctor"], // Populate relations if needed
        });

      // Trigger notification
      await strapi
        .service("api::notification.doctor-notification")
        .createNotification({
          message: `Doctor updated your appointment status to '${status}' at ${new Date().toString()}`,
          patientId: existingAppointment.patient.id,
        });

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
