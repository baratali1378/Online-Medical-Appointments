/// patient-notification
"use strict";

const dayjs = require("dayjs");

module.exports = ({ strapi }) => ({
  async createNotification({ message }) {
    try {
      return {};
    } catch (error) {
      strapi.log.error("Error Creating notification", error);
    }
  },
});
