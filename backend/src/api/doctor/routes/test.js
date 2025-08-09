module.exports = {
  routes: [
    {
      method: "GET",
      path: "/doctor/test-tokens",
      handler: "test.getAllDoctorTokens",
      config: {
        auth: false, // ⚠️ No auth for testing — remove in production
      },
    },
  ],
};
