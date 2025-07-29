module.exports = {
  routes: [
    {
      method: "GET",
      path: "/appointments/patient",
      handler: "patient-appointment.getPatientAppointments",
      config: {
        auth: false,
        policies: [],
        middlewares: ["api::patient.auth"],
      },
    },
    {
      method: "PUT",
      path: "/appointments/patient",
      handler: "patient-appointment.changeAppointmentStatus",
      config: {
        auth: false,
        policies: [],
        middlewares: ["api::patient.auth"],
      },
    },
  ],
};
