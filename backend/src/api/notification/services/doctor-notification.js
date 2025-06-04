"use strict";

module.exports = ({ strapi }) => ({
  async createNotification({ message, patientId }) {
    try {
      if (!patientId || !message) {
        throw new Error("Missing patient ID or message");
      }

      console.log("hh", patientId);

      const notification = await strapi.entityService.create(
        "api::notification.notification",
        {
          data: {
            message,
            patient: patientId,
          },
        }
      );

      return notification;
    } catch (error) {
      strapi.log.error("Error creating doctor notification:", error);
      throw error;
    }
  },
});
