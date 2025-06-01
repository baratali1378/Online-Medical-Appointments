// src/api/review/routes/review.js

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/doctor/reviews",
      handler: "review.findReviewsByDoctor",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
  ],
};
