module.exports = {
  routes: [
    {
      method: "GET",
      path: "/patient/me",
      handler: "profile.me",
      config: {
        auth: false,
        middlewares: ["api::patient.auth"],
      },
    },
    {
      method: "PUT",
      path: "/patient/me",
      handler: "update.updateMe",
      config: {
        auth: false,
        middlewares: ["api::patient.auth"],
      },
    },
    {
      method: "POST",
      path: "/patient/img",
      handler: "update.updateImg",
      config: {
        auth: false,
        middlewares: ["api::patient.auth"],
      },
    },
  ],
};
