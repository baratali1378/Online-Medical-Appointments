module.exports = {
  routes: [
    {
      method: "GET",
      path: "/appointments/patient",
      handler: "patient-appointment.getPatientAppointments",
      config: {
        policies: [],
        middlewares: ["api::patient.auth"],
      },
    },
  ],
};
