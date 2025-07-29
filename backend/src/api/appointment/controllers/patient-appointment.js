"use strict";
const { NotFoundError } = require("@strapi/utils").errors;
const dayjs = require("dayjs");

module.exports = ({ strapi }) => ({
  // 📌 Get all appointments for the patient
  async getPatientAppointments(ctx) {
    try {
      const patient = ctx.state.patient;
      if (!patient) {
        throw new NotFoundError("Patient profile not found");
      }

      const { status, search } = ctx.query;

      const appointments = await strapi
        .service("api::patient.patient-appointments")
        .getPatientAppointments(patient, { status, search });

      return ctx.send({
        data: appointments,
        meta: {
          count: appointments.length,
          filters: {
            status: status || "all",
            search: search || "none",
          },
        },
      });
    } catch (error) {
      strapi.log.error("Error fetching patient appointments:", error);
      if (error instanceof NotFoundError) {
        return ctx.notFound(error.message);
      }
      return ctx.internalServerError("Could not fetch appointments");
    }
  },

  // 📌 Change appointment status (e.g. Cancel)
  async changeAppointmentStatus(ctx) {
    try {
      const patient = ctx.state.patient;
      if (!patient) {
        throw new NotFoundError("Patient profile not found");
      }

      const { id, status } = ctx.request.body;

      if (!id || !status) {
        return ctx.badRequest("Appointment ID and new status are required");
      }

      const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
      if (!validStatuses.includes(status)) {
        return ctx.badRequest("Invalid appointment status");
      }

      // Check appointment belongs to patient
      const appointment = await strapi.db
        .query("api::appointment.appointment")
        .findOne({
          where: { id, patient: patient.id },
          populate: ["doctor"],
        });

      if (!appointment) {
        throw new NotFoundError("Appointment not found");
      }

      // ⏱ Time Restriction: allow cancel/change at least 24h before appointment
      const now = dayjs();
      const appointmentDate = dayjs(appointment.date);

      if (appointmentDate.diff(now, "hour") < 24) {
        return ctx.badRequest(
          "You can only change or cancel appointments at least 24 hours in advance."
        );
      }

      // ✅ Update appointment
      const updatedAppointment = await strapi.db
        .query("api::appointment.appointment")
        .update({
          where: { id },
          data: {
            appointment_status: status,
            updatedByPatient: true,
            updatedAt: new Date(),
            doctorID: appointment.doctor?.id,
          },
        });

      return ctx.send({
        message: "Appointment status updated successfully",
        data: updatedAppointment,
      });
    } catch (error) {
      strapi.log.error("Error updating patient appointment status:", error);
      return ctx.internalServerError("Could not update appointment status");
    }
  },
});
