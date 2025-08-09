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
      handler: "patient-appointment.updateAppointment",
      config: {
        auth: false,
        policies: [],
        middlewares: ["api::patient.auth"],
      },
    },
    {
      method: "POST",
      path: "/appointments/patient",
      handler: "patient-appointment.createAppointment",
      config: {
        auth: false,
        policies: [],
        middlewares: ["api::patient.auth"],
      },
    },
  ],
};
