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
    {
      method: "GET",
      path: "/doctor/medical-records",
      handler: "doctor.find",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
    {
      method: "GET",
      path: "/doctor/medical-records/:id",
      handler: "doctor.findOne",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
  ],
};
