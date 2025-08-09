"use strict";
const { NotFoundError, ValidationError } = require("@strapi/utils").errors;

module.exports = {
  async createReview(ctx) {
    try {
      const patient = ctx.state.patient;
      if (!patient || !patient.id) {
        return ctx.unauthorized("Patient not authenticated");
      }

      const { appointmentId, rating, comment } = ctx.request.body;

      if (!appointmentId || !rating) {
        return ctx.badRequest("Appointment ID and rating are required");
      }

      // 1️⃣ Find appointment belonging to this patient
      const appointment = await strapi.db
        .query("api::appointment.appointment")
        .findOne({
          where: { id: appointmentId, patient: patient.id },
          populate: { doctor: true, review: true },
        });

      if (!appointment) {
        throw new NotFoundError("Appointment not found for this patient");
      }

      // 2️⃣ Check appointment status is 'Completed'
      if (appointment.appointment_status !== "Completed") {
        throw new ValidationError(
          "You can only review a doctor after your appointment is completed"
        );
      }

      // 3️⃣ Prevent duplicate reviews
      if (appointment.review) {
        throw new ValidationError("You have already reviewed this appointment");
      }

      // 4️⃣ Create the review
      const review = await strapi.db.query("api::review.review").create({
        data: {
          patient: patient.id,
          doctor: appointment.doctor.id,
          appointment: appointment.id,
          rating,
          comment: comment || "",
          date: new Date(),
        },
      });

      // 5️⃣ Get all reviews count and ratings for this doctor
      const allReviews = await strapi.db.query("api::review.review").findMany({
        where: { doctor: appointment.doctor.id },
        select: ["rating"],
      });

      const avgRating =
        allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

      const reviewCount = allReviews.length;

      // 6️⃣ Update doctor rating and reviewCount
      await strapi.db.query("api::doctor.doctor").update({
        where: { id: appointment.doctor.id },
        data: {
          rating: Number(avgRating.toFixed(2)), // store as number
          reviewCount: reviewCount,
        },
      });

      return ctx.send({
        message: "Review created and doctor's rating updated successfully",
        data: review,
      });
    } catch (error) {
      strapi.log.error("Error creating review:", error);
      return ctx.internalServerError(
        error.message || "Could not create review"
      );
    }
  },
};
