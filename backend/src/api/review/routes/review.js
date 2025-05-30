// src/api/review/routes/review.js

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/reviews/doctor/",
      handler: "review.findReviewsByDoctor",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
  ],
};
