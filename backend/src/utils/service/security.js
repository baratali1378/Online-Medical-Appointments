// src/utils/service/security.js
module.exports = {
  async unlockExpiredAccountsForCollection(strapi, collectionName) {
    const now = new Date();

    // Correct query for components
    const lockedEntries = await strapi.db.query(collectionName).findMany({
      where: {
        security: {
          is_locked: true,
          lock_until: { $lt: now },
        },
      },
    });

    for (const entry of lockedEntries) {
      await strapi.db.query(collectionName).update({
        where: { id: entry.id },
        data: {
          security: {
            is_locked: false,
            lock_until: null,
            login_attempts: 0,
          },
        },
      });
    }

    return { unlocked: lockedEntries.length };
  },
};
