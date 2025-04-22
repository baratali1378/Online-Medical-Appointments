module.exports = {
  routes: [
    {
      method: "POST",
      path: "/patients/signup",
      handler: "auth.signup", // This should match the controller method name
      config: {
        auth: false, // No auth required for signup
      },
    },
    {
      method: "POST",
      path: "/patients/login",
      handler: "auth.login", // This should match the controller method name
      config: {
        auth: false, // No auth required for login
      },
    },
  ],
};
