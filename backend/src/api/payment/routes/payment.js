module.exports = {
  routes: [
    {
      method: "POST",
      path: "/appointments/patient/create-checkout-session",
      handler: "payment.createCheckoutSession",
      config: {
        policies: [],
        middlewares: ["api::patient.auth"],
      },
    },
    {
      method: "POST",
      path: "/appointments/patient/webhook",
      handler: "payment.webhook",
      config: {
        auth: false, // Stripe webhook does not need auth
      },
    },
  ],
};
