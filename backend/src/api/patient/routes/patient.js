module.exports = {
  routes: [
    {
      method: "POST",
      path: "/patients/signup",
      handler: "signup.signup",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/patients/login",
      handler: "login.login",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/patient/me",
      handler: "profile.me",
      config: {
        auth: false,
      },
    },
  ],
};
