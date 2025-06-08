module.exports = {
  routes: [
    {
      method: "POST",
      path: "/doctor/medical-records",
      handler: "doctor.createMedicalRecord",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
  ],
};
