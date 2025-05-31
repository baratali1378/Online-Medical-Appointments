module.exports = {
  async login(ctx) {
    try {
      const result = await strapi
        .service("api::doctor.auth")
        .login(ctx.request.body);
      return ctx.send(result);
    } catch (err) {
      strapi.log.error("Login error:", err);
      return ctx.internalServerError("Something went wrong during login");
    }
  },

  async signup(ctx) {
    try {
      const result = await strapi
        .service("api::doctor.auth")
        .signup(ctx.request.body.data);
      return ctx.send(result);
    } catch (err) {
      strapi.log.error("Signup error:", err);
      return ctx.internalServerError(err.message || "Signup failed");
    }
  },
};
