module.exports = {
  routes: [
    {
      method: "GET",
      path: "/doctor/available-slots",
      handler: "doctor.getDoctorAvailableSlots",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
    {
      method: "POST",
      path: "/doctor/available-slots",
      handler: "doctor.createAvailableSlot",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
    {
      method: "PUT",
      path: "/doctor/available-slots/:id",
      handler: "doctor.updateAvailableSlot",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
    {
      method: "DELETE",
      path: "/doctor/available-slots/:id",
      handler: "doctor.deleteAvailableSlot",
      config: {
        auth: false,
        middlewares: ["api::doctor.auth"],
      },
    },
    {
      method: "GET",
      path: "/doctor/available-slots/:doctorId",
      handler: "patient.getDoctorAvailableSlots",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/doctor/available-slots/testing",
      handler: "test.updatePrice",
      config: {
        auth: false,
      },
    },
  ],
};
