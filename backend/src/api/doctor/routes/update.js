module.exports = {
  routes: [
    {
      method: "POST",
      path: "/doctor/img",
      handler: "update.updateImg",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
    {
      method: "PUT",
      path: "/doctor/profile",
      handler: "update.updateMe",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
    {
      method: "POST",
      path: "/doctor/verification",
      handler: "update.verification",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
  ],
};
