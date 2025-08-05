module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/request-reset",
      handler: "reset-password.requestReset",
      config: { auth: false },
    },
    {
      method: "POST",
      path: "/auth/reset-password",
      handler: "reset-password.resetPassword",
      config: { auth: false },
    },
  ],
};
