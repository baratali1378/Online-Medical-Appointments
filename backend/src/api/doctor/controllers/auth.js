module.exports = {
  async login(ctx) {
    try {
      const result = await strapi
        .service("api::doctor.auth")
        .login(ctx.request.body);
      return ctx.send(result);
    } catch (err) {
      strapi.log.error("Login error:", err);

      ctx.status = err.status || 500;
      ctx.body = {
        error: err.message || "Something went wrong during login",
        type: err.name || "InternalServerError",
      };
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

      ctx.status = err.status || 500;
      ctx.body = {
        error: err.message || "Signup failed",
        type: err.name || "InternalServerError",
      };
    }
  },
};
