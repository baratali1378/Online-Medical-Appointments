"use strict";

const Stripe = require("stripe");
// @ts-ignore
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
  async createCheckoutSession(ctx) {
    try {
      const { appointmentId, price } = ctx.request.body;

      if (!appointmentId || !price) {
        return ctx.badRequest("Appointment ID and price are required");
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Appointment #${appointmentId}`,
              },
              unit_amount: Math.round(price * 100), // cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
        metadata: { appointmentId },
      });

      return ctx.send({ url: session.url });
    } catch (err) {
      console.error(err);
      return ctx.internalServerError("Failed to create checkout session");
    }
  },

  async webhook(ctx) {
    const sig = ctx.request.header["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        ctx.request.body,
        sig,
        webhookSecret
      );
    } catch (err) {
      return ctx.badRequest(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const appointmentId = session.metadata.appointmentId;

      // Update appointment payment status in Strapi
      await strapi.db.query("api::appointment.appointment").update({
        where: { id: appointmentId },
        data: {
          payment_status: "Paid",
          transaction_id: session.payment_intent,
        },
      });
    }

    return ctx.send({ received: true });
  },
};
