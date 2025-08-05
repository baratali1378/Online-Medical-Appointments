"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  async requestReset(ctx) {
    const { email, role } = ctx.request.body.data;

    if (!email || !role) {
      return ctx.badRequest("Email and role are required");
    }

    // Validate role and find user accordingly
    let user;
    if (role === "patient") {
      user = await strapi.db
        .query("api::patient.patient")
        .findOne({ where: { personal_info: { email } } });
    } else if (role === "doctor") {
      user = await strapi.db
        .query("api::doctor.doctor")
        .findOne({ where: { personal_info: { email } } });
    } else {
      return ctx.badRequest("Invalid role");
    }

    if (!user) {
      return ctx.badRequest("User not found");
    }

    // Create JWT with id and role embedded
    const token = jwt.sign(
      { id: user.id, role },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "1h" }
    );

    // Prepare email message
    const message = {
      email: email,
      subject: "Reset your password",
      content: `Click here to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${token}`,
    };

    try {
      // @ts-ignore
      await strapi.rabbitmq.publishToQueue(message);
      return ctx.send({ message: "Password reset email sent" });
    } catch (error) {
      strapi.log.error(
        "Failed to send reset password email via RabbitMQ",
        error
      );
      return ctx.internalServerError("Failed to send reset password email");
    }
  },

  async resetPassword(ctx) {
    const { token, password } = ctx.request.body.data;

    if (!token || !password) {
      return ctx.badRequest("Token and new password are required");
    }

    try {
      // Decode token and get role and id
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "supersecret"
      );
      // @ts-ignore
      const { id, role } = decoded;

      let modelUID;
      if (role === "patient") {
        modelUID = "api::patient.patient";
      } else if (role === "doctor") {
        modelUID = "api::doctor.doctor";
      } else {
        return ctx.badRequest("Invalid role in token");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await strapi.db.query(modelUID).update({
        where: { id },
        data: { password: hashedPassword },
      });

      return ctx.send({ message: "Password updated successfully" });
    } catch (err) {
      return ctx.badRequest("Invalid or expired token");
    }
  },
};
