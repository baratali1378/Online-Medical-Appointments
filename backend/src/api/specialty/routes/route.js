module.exports = {
  routes: [
    {
      method: "GET",
      path: "/specialties/top",
      handler: "specialty.getTopSpecialties",
      config: {
        auth: false, // or true if you want auth
      },
    },
  ],
};
