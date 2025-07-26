"use strict";

module.exports = ({ strapi }) => ({
  // Fetch notifications for a user (doctor or patient)
  async fetchNotifications({
    userType,
    userId,
    filter,
    search,
    page = 1,
    pageSize = 10,
  }) {
    const filters = {
      [`${userType}`]: userId,
    };

    // Apply read filter
    if (filter === "read") filters.read = true;
    else if (filter === "unread") filters.read = false;

    // Search by message text if provided
    if (search) {
      filters.message = {
        $containsi: search, // case-insensitive contains
      };
    }

    const start = (page - 1) * pageSize;

    // Query notifications with pagination and filters
    const notifications = await strapi.entityService.findMany(
      "api::notification.notification",
      {
        filters,
        sort: { createdAt: "desc" },
        start,
        limit: pageSize,
      }
    );

    // Count total notifications for pagination
    const total = await strapi.entityService.count(
      "api::notification.notification",
      { filters }
    );

    return { notifications, total };
  },

  // Mark a single notification as read
  async markAsRead(notificationId) {
    return await strapi.entityService.update(
      "api::notification.notification",
      notificationId,
      {
        data: { read: true },
      }
    );
  },

  // Mark all notifications for user as read
  async markAllAsRead({ userType, userId }) {
    if (!userType || !userId) {
      throw new Error("userType and userId are required");
    }

    const updated = await strapi.db
      .query("api::notification.notification")
      .updateMany({
        where: {
          [userType]: {
            id: userId, // ✅ Correct way to filter by relation ID
          },
          read: false,
        },
        data: { read: true },
      });

    return updated;
  },
  // Delete a notification by ID
  async deleteNotification(notificationId) {
    return await strapi.entityService.delete(
      "api::notification.notification",
      notificationId
    );
  },
});
