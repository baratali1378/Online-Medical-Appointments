// src/api/review/routes/review.js

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/doctor/reviews",
      handler: "doctor.findReviewsByDoctor",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
  ],
};
