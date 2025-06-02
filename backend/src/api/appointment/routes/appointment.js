module.exports = {
  routes: [
    {
      method: "GET",
      path: "/appointments/doctor/:doctorId",
      handler: "appointment.getDoctorAppointments",
      config: {
        policies: [],
        auth: {
          scope: ["api::appointment.appointment.find"],
        },
        middlewares: [],
      },
    },
  ],
};
