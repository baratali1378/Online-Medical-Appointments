module.exports = {
  routes: [
    {
      method: "POST",
      path: "/doctors/login",
      handler: "auth.login",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/doctors/signup",
      handler: "auth.signup",
      config: {
        auth: false, // public access
        policies: [],
      },
    },
  ],
};
