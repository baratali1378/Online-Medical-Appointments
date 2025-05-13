const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  async login(ctx) {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
      return ctx.badRequest("Email and password are required");
    }

    // Find doctor by email
    const doctor = await strapi.db.query("api::doctor.doctor").findOne({
      where: { email },
    });

    if (!doctor) {
      return ctx.unauthorized("Invalid email or password");
    }

    // Ensure that doctor.password is a hashed string
    if (!doctor.password) {
      return ctx.unauthorized("Invalid email or password");
    }

    // Validate password with bcrypt
    try {
      const validPassword = await bcrypt.compare(password, doctor.password);
      if (!validPassword) {
        return ctx.unauthorized("Invalid email or password");
      }
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return ctx.internalServerError(
        "Something went wrong while checking the password."
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: doctor.id, email: doctor.email, role: "doctor" },
      process.env.JWT_SECRET || "online-medical",
      { expiresIn: "1d" }
    );

    // Return the token and doctor information
    return {
      token,
      role: "doctor",
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        profile_picture: doctor.profile_picture,
      },
    };
  },
};
