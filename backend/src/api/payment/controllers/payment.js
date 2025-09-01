"use strict";

const Stripe = require("stripe");
// @ts-ignore
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
  /**
   * 📌 Create a Stripe Checkout session
   */
  async createCheckoutSession(ctx) {
    try {
      const { doctorId, slotId, price } = ctx.request.body;
      console.log(ctx.request.body);

      if (!doctorId || !slotId || !price) {
        return ctx.badRequest("Doctor ID, Slot ID, and Price are required");
      }

      const patient = ctx.state.patient; // authenticated patient
      if (!patient) {
        return ctx.unauthorized("Patient authentication required");
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "afn", // or "afn"
              product_data: {
                name: `Doctor Appointment`,
              },
              unit_amount: Math.round(price * 100), // cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          doctorId,
          slotId,
          patientId: patient.id,
        },
      });

      return ctx.send({ url: session.url });
    } catch (err) {
      strapi.log.error("Stripe checkout session error:", err);
      return ctx.internalServerError("Failed to create checkout session");
    }
  },

  async webhook(ctx) {
    const sig = ctx.request.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig) {
      strapi.log.error("❌ Stripe signature missing");
      return ctx.badRequest("Stripe signature missing");
    }

    let event;
    try {
      // Use the raw unparsed body that Strapi provides
      const rawBody = ctx.request.body[Symbol.for("unparsedBody")];

      if (!rawBody) {
        strapi.log.error(
          "❌ Raw body not available. Check includeUnparsed config."
        );
        return ctx.badRequest("Raw body not available");
      }

      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err) {
      strapi.log.error(
        "❌ Stripe Webhook signature verification failed:",
        err.message
      );
      return ctx.badRequest(`Webhook Error: ${err.message}`);
    }

    // ✅ Handle successful checkout session
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { doctorId, slotId, patientId } = session.metadata;

      try {
        // Validate required metadata
        if (!doctorId || !slotId || !patientId) {
          strapi.log.error("❌ Missing metadata in session:", session.metadata);
          return ctx.send({ received: true });
        }

        // 🔍 Check if slot is available
        const slot = await strapi.db
          .query("api::available-slot.available-slot")
          .findOne({
            where: { id: slotId, doctor: doctorId },
          });

        if (!slot) {
          strapi.log.warn("⚠️ Slot not found:", slotId);
          return ctx.send({ received: true });
        }

        if (slot.capacity <= 0) {
          strapi.log.warn("⚠️ Slot capacity exhausted:", slotId);
          return ctx.send({ received: true });
        }

        const dayjs = require("dayjs");
        const appointmentDateTime = dayjs(`${slot.date}T${slot.start_time}`);

        // ✅ Create appointment
        const appointment = await strapi.db
          .query("api::appointment.appointment")
          .create({
            data: {
              patient: patientId,
              doctor: doctorId,
              available_slot: slotId,
              date: appointmentDateTime.toDate(),
              start_time: slot.start_time,
              end_time: slot.end_time,
              price: slot.price,
              appointment_status: "Confirmed",
              payment_status: "Paid",
              transaction_id: session.payment_intent,
            },
          });

        // 🔄 Update slot capacity
        await strapi.db.query("api::available-slot.available-slot").update({
          where: { id: slotId },
          data: {
            capacity: slot.capacity - 1,
            is_booked: slot.capacity - 1 <= 0,
          },
        });

        // 🔗 Link doctor to patient if not already linked
        const patient = await strapi.db.query("api::patient.patient").findOne({
          where: { id: patientId },
          populate: ["doctors"],
        });

        if (patient && patient.doctors) {
          const alreadyLinked = patient.doctors.some(
            (doc) => doc.id === Number(doctorId)
          );

          if (!alreadyLinked) {
            await strapi.db.query("api::patient.patient").update({
              where: { id: patientId },
              data: {
                doctors: [
                  ...patient.doctors.map((doc) => doc.id),
                  Number(doctorId),
                ],
              },
            });
          }
        }

        strapi.log.info(`✅ Appointment ${appointment.id} created via Stripe`);
      } catch (error) {
        strapi.log.error("❌ Error creating appointment:", error);
      }
    } else {
      // Log other event types for debugging
      strapi.log.info(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return ctx.send({ received: true });
  },
};
