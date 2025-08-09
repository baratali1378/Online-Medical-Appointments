"use strict";
const { NotFoundError } = require("@strapi/utils").errors;
const dayjs = require("dayjs");

module.exports = ({ strapi }) => ({
  /**
   * 📌 Get all appointments for the patient
   */
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

  /**
   * 📌 Change appointment status (Cancel / Reschedule)
   * Accepts:
   *  - appointment_status (Pending / Cancelled etc.)
   *  - available_slot (for reschedule)
   */
  async updateAppointment(ctx) {
    try {
      const patient = ctx.state.patient;
      if (!patient) throw new NotFoundError("Patient profile not found");

      const { id, appointment_status, available_slot } = ctx.request.body.data;
      if (!id || !appointment_status) {
        return ctx.badRequest("Appointment ID and new status are required");
      }

      const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
      if (!validStatuses.includes(appointment_status)) {
        return ctx.badRequest("Invalid appointment status");
      }

      // 🔍 Find appointment
      const appointment = await strapi.db
        .query("api::appointment.appointment")
        .findOne({
          where: { id, patient: patient.id },
          populate: ["doctor", "available_slot"],
        });

      if (!appointment) throw new NotFoundError("Appointment not found");

      // ⏱ Restriction check based on `date` (datetime field)
      if (dayjs(appointment.date).diff(dayjs(), "hour") < 24) {
        return ctx.badRequest(
          "You can only change or cancel appointments at least 24 hours in advance."
        );
      }

      // Prepare update data
      let updateData = {
        appointment_status,
        updatedByPatient: true,
        updatedAt: new Date(),
        doctorID: appointment.doctor?.id,
      };

      // 🗑 Free old slot if cancelling or rescheduling
      if (appointment.available_slot) {
        await strapi.db.query("api::available-slot.available-slot").update({
          where: { id: appointment.available_slot.id },
          data: {
            capacity: appointment.available_slot.capacity + 1,
            is_booked: false,
          },
        });
      }

      // 📅 Rescheduling: book new slot
      if (appointment_status === "Pending" && available_slot) {
        const slot = await strapi.db
          .query("api::available-slot.available-slot")
          .findOne({
            where: { id: available_slot, doctor: appointment.doctor.id },
          });

        if (!slot) return ctx.badRequest("Invalid or unavailable slot");
        if (slot.capacity <= 0) {
          return ctx.badRequest("Selected slot is full or already booked");
        }

        // Book new slot
        await strapi.db.query("api::available-slot.available-slot").update({
          where: { id: slot.id },
          data: { capacity: slot.capacity - 1 },
        });

        // Update appointment datetime
        const slotDateTime = dayjs(
          `${dayjs(slot.date).format("YYYY-MM-DD")} ${slot.start_time}`
        );

        updateData = {
          ...updateData,
          date: slotDateTime.toDate(),
          start_time: slot.start_time,
          end_time: slot.end_time,
          available_slot: slot.id,
        };
      }

      // ✅ Update appointment
      const updatedAppointment = await strapi.db
        .query("api::appointment.appointment")
        .update({
          where: { id },
          data: updateData,
        });

      return ctx.send({
        message: "Appointment updated successfully",
        data: updatedAppointment,
      });
    } catch (error) {
      strapi.log.error("Error updating patient appointment status:", error);
      return ctx.internalServerError("Could not update appointment status");
    }
  },

  async createAppointment(ctx) {
    try {
      const patient = ctx.state.patient;
      if (!patient) throw new NotFoundError("Patient profile not found");

      const { note, doctorId, slotId } = ctx.request.body;

      // Validate required params
      if (!doctorId || !slotId) {
        return ctx.badRequest("Doctor ID and Slot ID are required");
      }

      // Find the available slot with doctor relation
      const slot = await strapi.db
        .query("api::available-slot.available-slot")
        .findOne({
          where: { id: slotId, doctor: doctorId },
        });

      if (!slot) {
        return ctx.badRequest("Invalid or unavailable slot");
      }

      if (slot.capacity <= 0) {
        return ctx.badRequest("Selected slot is full or already booked");
      }

      // Combine date and start_time to a single datetime for appointment.date
      const dayjs = require("dayjs");
      const appointmentDateTime = dayjs(`${slot.date}T${slot.start_time}`);

      // Create appointment record
      const appointment = await strapi.db
        .query("api::appointment.appointment")
        .create({
          data: {
            patient: patient.id,
            doctor: doctorId,
            available_slot: slotId,
            date: appointmentDateTime.toDate(),
            start_time: slot.start_time,
            end_time: slot.end_time,
            note: note || "",
            appointment_status: "Pending", // Initial status
          },
        });

      // Update slot capacity and optionally mark it booked
      await strapi.db.query("api::available-slot.available-slot").update({
        where: { id: slotId },
        data: {
          capacity: slot.capacity - 1,
          is_booked: slot.capacity - 1 <= 0 ? true : false,
        },
      });

      return ctx.send({
        message: "Appointment created successfully",
        data: appointment,
      });
    } catch (error) {
      strapi.log.error("Error creating appointment:", error);
      return ctx.internalServerError("Could not create appointment");
    }
  },
});
