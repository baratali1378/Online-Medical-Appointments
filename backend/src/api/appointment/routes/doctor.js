module.exports = {
  routes: [
    {
      method: "GET",
      path: "/appointments/doctor",
      handler: "doctor-appointment.getDoctorAppointments",
      config: {
        auth: false,
        policies: [],
        middlewares: ["api::doctor.auth"],
      },
    },
    {
      method: "PUT",
      path: "/appointments/doctor",
      handler: "doctor-appointment.changeAppointmentStatus",
      config: {
        auth: false,
        policies: [],
        middlewares: ["api::doctor.auth"],
      },
    },
  ],
};
