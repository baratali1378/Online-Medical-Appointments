"use strict";

module.exports = {
  async list(ctx) {
    try {
      const patient = ctx.state.patient;

      if (!patient) {
        return ctx.unauthorized("No patient data available");
      }

      const { filter, search, page, pageSize } = ctx.query;

      const data = await strapi
        .service("api::notification.notifications")
        .fetchNotifications({
          userType: "patient",
          userId: patient.id,
          filter,
          search,
          page: Number(page) || 1,
          pageSize: Number(pageSize) || 10,
        });

      ctx.send(data);
    } catch (err) {
      strapi.log.error("Error fetching notifications:", err);
      ctx.internalServerError("Failed to fetch notifications");
    }
  },

  async markRead(ctx) {
    try {
      const { id } = ctx.params;

      if (!id) {
        return ctx.badRequest("Notification ID is required");
      }

      await strapi.service("api::notification.notifications").markAsRead(id);

      ctx.send({ message: "Notification marked as read" });
    } catch (err) {
      strapi.log.error("Error marking notification as read:", err);
      ctx.internalServerError("Failed to mark notification as read");
    }
  },

  async markAllRead(ctx) {
    try {
      const patient = ctx.state.patient;

      if (!patient) {
        return ctx.unauthorized("No patient data available");
      }

      await strapi
        .service("api::notification.notifications")
        .markAllAsRead({ userType: "patient", userId: patient.id });

      ctx.send({ message: "All notifications marked as read" });
    } catch (err) {
      strapi.log.error("Error marking all notifications as read:", err);
      ctx.internalServerError("Failed to mark all notifications as read");
    }
  },

  async delete(ctx) {
    try {
      const { id } = ctx.params;

      if (!id) {
        return ctx.badRequest("Notification ID is required");
      }

      await strapi
        .service("api::notification.notifications")
        .deleteNotification(id);

      ctx.send({ message: "Notification deleted" });
    } catch (err) {
      strapi.log.error("Error deleting notification:", err);
      ctx.internalServerError("Failed to delete notification");
    }
  },
};
