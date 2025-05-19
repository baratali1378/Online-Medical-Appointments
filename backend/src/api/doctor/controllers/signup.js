"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * Doctor Signup
   * Creates a doctor and returns a JWT token
   */
  async signup(ctx) {
    try {
      const {
        name,
        email,
        password,
        expreience,
        biography,
        specialties,
        phone_number,
        city,
      } = ctx.request.body.data;

      // Validate required fields
      if (!name || !email || !password || !expreience) {
        return ctx.badRequest(
          "Please provide all required fields: name, email, password, experience"
        );
      }

      // Check if doctor with same email already exists
      const existingDoctor = await strapi.db
        .query("api::doctor.doctor")
        .findOne({ where: { email } });

      if (existingDoctor) {
        return ctx.badRequest("A doctor with this email already exists.");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new doctor
      const newDoctor = await strapi.db.query("api::doctor.doctor").create({
        data: {
          name,
          email,
          password: hashedPassword,
          expreience,
          biography,
          specialties,
          phone_number,
          city,
          publishedAt: new Date(),
        },
      });

      // Generate JWT token
      const token = jwt.sign(
        { id: newDoctor.id, email: newDoctor.email, role: "doctor" },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" }
      );

      // Return token and doctor info
      return ctx.send({
        token,
        role: "doctor",
      });
    } catch (error) {
      strapi.log.error("Doctor signup error:", error);
      return ctx.internalServerError("Something went wrong during signup.");
    }
  },
};
