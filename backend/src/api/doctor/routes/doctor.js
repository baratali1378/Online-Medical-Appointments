module.exports = {
  routes: [
    {
      method: "POST",
      path: "/doctors/auth",
      handler: "auth.login",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/doctors/search",
      handler: "doctor.search",
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
