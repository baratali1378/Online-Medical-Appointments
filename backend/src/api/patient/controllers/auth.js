module.exports = {
  async login(ctx) {
    try {
      const { email, password } = ctx.request.body;
      const patientService = strapi.service("api::patient.auth");

      const result = await patientService.login(email, password);
      return ctx.send(result);
    } catch (error) {
      if (
        error.message.includes("Invalid") ||
        error.message.includes("locked")
      ) {
        return ctx.unauthorized(error.message);
      }
      if (
        error.message.includes("required") ||
        error.message.includes("exists") ||
        error.message.includes("not found")
      ) {
        return ctx.badRequest(error.message);
      }
      strapi.log.error("Login error:", error);
      return ctx.internalServerError("Something went wrong during login");
    }
  },

  async signup(ctx) {
    try {
      const data = ctx.request.body.data;
      const patientService = strapi.service("api::patient.auth");

      const result = await patientService.signup(data);
      return ctx.send(result);
    } catch (error) {
      if (
        error.message.includes("required") ||
        error.message.includes("exists") ||
        error.message.includes("not found")
      ) {
        return ctx.badRequest(error.message);
      }
      strapi.log.error("Patient signup error:", error);
      return ctx.internalServerError(error.message || "Registration failed");
    }
  },
};
