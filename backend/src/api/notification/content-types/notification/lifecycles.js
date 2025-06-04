"use strict";

module.exports = {
  afterCreate: async (event) => {
    const { result, params } = event;

    strapi.log.info("Notification lifecycle triggered");
    strapi.log.info("result:", result);
    strapi.log.info("params:", params);

    // Determine the user type and ID
    const userType = params.data.patient
      ? "patient"
      : params.data.doctor
        ? "doctor"
        : null;

    const userId = params.data.patient || params.data.doctor;

    if (!userType || !userId) {
      strapi.log.warn("Missing userType or userId in notification");
      return;
    }

    try {
      // Publish notification via Redis or other system
      // @ts-ignore
      await strapi.redis.publish(
        "notifications",
        JSON.stringify({
          id: result.id,
          userType,
          userId,
          message: result.message,
        })
      );

      strapi.log.info(`Notification published to ${userType} ${userId}`);
    } catch (err) {
      strapi.log.error("Redis publish failed in notification lifecycle:", err);
    }
  },
};
