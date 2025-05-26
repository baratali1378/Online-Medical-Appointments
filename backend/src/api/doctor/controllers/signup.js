"use strict";

// @ts-ignore
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async signup(ctx) {
    try {
      const { name, email, password, experience, phone_number, city } =
        ctx.request.body.data;

      // Validate required fields
      if (!name || !email || !password || !experience || !city) {
        return ctx.badRequest("Please provide all required fields");
      }

      // Check if a doctor with this email already exists via personal_info component
      const existingDoctors = await strapi.db
        .query("api::doctor.doctor")
        .findMany({
          where: {
            personal_info: {
              email: email,
            },
          },
        });

      if (existingDoctors.length > 0) {
        return ctx.badRequest("A doctor with this email already exists");
      }

      // Find the city by name
      const foundCity = await strapi.db.query("api::city.city").findOne({
        where: { name: city },
      });

      if (!foundCity) {
        return ctx.badRequest(`City '${city}' not found`);
      }

      // Format phone_number array of component entries
      const phoneComponentData = Array.isArray(phone_number)
        ? phone_number.map((number) => ({
            text: number,
          }))
        : [
            {
              text: phone_number,
            },
          ];

      // Create the doctor
      const newDoctor = await strapi.entityService.create(
        "api::doctor.doctor",
        {
          data: {
            personal_info: {
              fullname: name,
              email: email,
            },
            security: {
              is_verified: false,
              is_locked: false,
            },
            experience: experience,
            phone_number: phoneComponentData,
            city: foundCity.id,
            password: password,
            publishedAt: new Date(),
          },
          populate: ["personal_info, security"],
        }
      );

      // Generate JWT token
      const token = jwt.sign(
        {
          id: newDoctor.id,
          email: email,
          role: "doctor",
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return ctx.send({
        token,
        role: "doctor",
      });
    } catch (error) {
      strapi.log.error("Doctor signup error:", error);
      return ctx.internalServerError(error.message || "Registration failed");
    }
  },
};
