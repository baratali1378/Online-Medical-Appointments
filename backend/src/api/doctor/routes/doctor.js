module.exports = {
  routes: [
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
      method: "GET",
      path: "/doctors/autocomplete",
      handler: "search.autocomplete",
      config: {
        auth: false, // Make publicly accessible
        policies: [],
        middlewares: [],
        description: "Autocomplete doctor names",
        tag: {
          name: "Doctor",
          action: "read",
        },
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
      handler: "update.verification",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
  ],
};
