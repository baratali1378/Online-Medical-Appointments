// path: src/api/medical-record/routes/patient-medical-record.js
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/patient/medical-records",
      handler: "patient.list",
      config: {
        auth: false,
        middlewares: ["api::patient.auth"],
      },
    },
    {
      method: "GET",
      path: "/patient/medical-records/:id",
      handler: "patient.detail",
      config: {
        auth: false,
        middlewares: ["api::patient.auth"],
      },
    },
  ],
};
