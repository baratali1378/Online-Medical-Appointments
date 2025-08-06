"use strict";

const bcrypt = require("bcryptjs");

module.exports = ({ strapi }) => ({
  async updatePassword({ id, role, password }) {
    try {
      if (!id || !role || !password) {
        return {
          success: false,
          message: "ID, role, and password are required",
        };
      }

      // Determine model
      const modelUID =
        role === "patient"
          ? "api::patient.patient"
          : role === "doctor"
            ? "api::doctor.doctor"
            : null;

      if (!modelUID) {
        return { success: false, message: "Invalid role" };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update DB
      await strapi.db.query(modelUID).update({
        where: { id },
        data: { password: hashedPassword },
      });

      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      strapi.log.error("Password update error:", error);
      return { success: false, message: "Error updating password" };
    }
  },
});
