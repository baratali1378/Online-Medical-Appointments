module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/request-reset",
      handler: "password.requestReset",
      config: { auth: false },
    },
    {
      method: "POST",
      path: "/auth/reset-password",
      handler: "password.resetPassword",
      config: { auth: false },
    },
    {
      method: "PUT",
      path: "/auth/doctor/change-password",
      handler: "password.doctorChangePassword",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
    {
      method: "PUT",
      path: "/auth/patient/change-password",
      handler: "password.patientChangePassword",
      config: {
        auth: false,
        middlewares: ["api::patient.auth"],
      },
    },
  ],
};
