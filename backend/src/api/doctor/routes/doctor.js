module.exports = {
  routes: [
    {
      method: "POST",
      path: "/doctors/login",
      handler: "login.login",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/doctors/search",
      handler: "search.search",
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/doctors/signup",
      handler: "signup.signup",
      config: {
        auth: false, // public access
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/doctor/profile",
      handler: "profile.me",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"], // use your auth middleware here
      },
    },
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
      handler: "verification.verification",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
  ],
};
