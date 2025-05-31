module.exports = {
  routes: [
    {
      method: "POST",
      path: "/patients/signup",
      handler: "auth.signup",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/patients/login",
      handler: "auth.login",
      config: {
        auth: false,
      },
    },
  ],
};
