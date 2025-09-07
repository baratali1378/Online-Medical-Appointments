module.exports = {
  async login(ctx) {
    try {
      const { email, password } = ctx.request.body;
      console.log(email, password);
      const patientService = strapi.service("api::patient.auth");

      const result = await patientService.login(email, password);
      return ctx.send(result);
    } catch (error) {
      strapi.log.error("Login error:", error);

      ctx.status = error.status || 500;
      ctx.body = {
        error: error.message || "Something went wrong during login",
        type: error.name || "InternalServerError",
      };
    }
  },

  async signup(ctx) {
    try {
      const data = ctx.request.body?.data;
      if (!data) {
        return ctx.badRequest("Request body is missing 'data' object");
      }

      const patientService = strapi.service("api::patient.auth");
      const result = await patientService.signup(data);
      return ctx.send(result);
    } catch (error) {
      strapi.log.error("Signup error:", error);

      ctx.status = error.status || 500;
      ctx.body = {
        error: error.message || "Signup failed",
        type: error.name || "InternalServerError",
      };
    }
  },
};
