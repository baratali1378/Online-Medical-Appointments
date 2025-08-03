module.exports = {
  routes: [
    // Create medical record
    {
      method: "POST",
      path: "/doctor/medical-records",
      handler: "doctor.createMedicalRecord",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },

    // Get all medical records for doctor
    {
      method: "GET",
      path: "/doctor/medical-records",
      handler: "doctor.find",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },

    // Get single medical record by ID
    {
      method: "GET",
      path: "/doctor/medical-records/:id",
      handler: "doctor.findOne",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },

    // Update medical record
    {
      method: "PUT",
      path: "/doctor/medical-records/:id",
      handler: "doctor.update",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
  ],
};
