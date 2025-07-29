module.exports = {
  routes: [
    {
      method: "GET",
      path: "/notifications/patient",
      handler: "patient.list",
      config: {
        auth: false,
        middlewares: ["api::patient.auth"],
      },
    },
    {
      method: "PUT",
      path: "/notifications/patient/:id/read",
      handler: "doctor.markRead",
      config: {
        auth: false,
        middlewares: ["api::patient.auth"],
      },
    },
    {
      method: "PUT",
      path: "/notifications/patient/read-all",
      handler: "patient.markAllRead",
      config: {
        auth: false,
        middlewares: ["api::patient.auth"],
      },
    },
    {
      method: "DELETE",
      path: "/notifications/patient/:id",
      handler: "doctor.delete",
      config: {
        auth: false,
        middlewares: ["api::patient.auth"],
      },
    },
  ],
};
