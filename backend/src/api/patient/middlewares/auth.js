"use strict";

const jwt = require("jsonwebtoken");
const patientService = require("../services/patient-utils"); // Adjust path if needed

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const authHeader = ctx.request.header.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ctx.unauthorized("No token provided");
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // @ts-ignore
      if (!decoded || !decoded.id) {
        return ctx.unauthorized("Invalid token");
      }

      const patient = await patientService.findPatientById(decoded.id);

      if (!patient) {
        return ctx.notFound("Patient not found");
      }

      ctx.state.patient = patient;
      await next();
    } catch (error) {
      strapi.log.error("JWT error:", error);
      return ctx.unauthorized("Invalid or expired token");
    }
  };
};
