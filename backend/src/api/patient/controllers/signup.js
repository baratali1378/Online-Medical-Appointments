"use strict";

// @ts-ignore
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async signup(ctx) {
    try {
      const { name, email, password, phone, city, gender } =
        ctx.request.body.data;

      // Validate required fields
      if (!name || !email || !password || !phone || !city) {
        return ctx.badRequest("Please provide all required fields");
      }

      const fullname = name;

      // Check if patient with this email or phone already exists
      const existingPatients = await strapi.db
        .query("api::patient.patient")
        .findMany({
          where: {
            $or: [
              { personal_info: { email } },
              { contact_details: { phone_number: phone } },
            ],
          },
          populate: ["personal_info", "contact_details"],
        });

      if (existingPatients.length > 0) {
        return ctx.badRequest(
          "A patient with this email or phone already exists"
        );
      }

      // Find the city by name
      const foundCity = await strapi.db.query("api::city.city").findOne({
        where: { name: city },
      });

      if (!foundCity) {
        return ctx.badRequest(`City '${city}' not found`);
      }

      // Create the patient
      const newPatient = await strapi.entityService.create(
        "api::patient.patient",
        {
          data: {
            personal_info: {
              fullname,
              email,
              gender: gender || null,
            },
            contact_details: {
              phone_number: phone,
              city: foundCity.id,
            },
            password: password,
            publishedAt: new Date(),
          },
          populate: ["personal_info"],
        }
      );

      // Generate JWT token
      const token = jwt.sign(
        {
          id: newPatient.id,
          email: email,
          role: "patient",
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return ctx.send({
        token,
        role: "patient",
      });
    } catch (error) {
      strapi.log.error("Patient signup error:", error);
      return ctx.internalServerError(error.message || "Registration failed");
    }
  },
};
