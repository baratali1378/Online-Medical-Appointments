module.exports = {
  routes: [
    {
      method: "GET",
      path: "/notifications/doctor",
      handler: "doctor.list",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
    {
      method: "PUT",
      path: "/notifications/doctor/:id/read",
      handler: "doctor.markRead",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
    {
      method: "PUT",
      path: "/notifications/doctor/read-all",
      handler: "doctor.markAllRead",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
    {
      method: "DELETE",
      path: "/notifications/doctor/:id",
      handler: "doctor.delete",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
  ],
};
