// src/api/review/routes/review.js

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/patient/review",
      handler: "patient.createReview",
      config: {
        auth: false,
        middlewares: ["api::patient.auth"],
      },
    },
  ],
};
