// src/api/patient/services/security.js
module.exports = ({ strapi }) => ({
  async unlockExpiredAccounts() {
    const now = new Date();
    const lockedPatients = await strapi.db
      .query("api::patient.patient")
      .findMany({
        where: {
          "security.is_locked": true,
          "security.lock_until": { $lt: now },
        },
      });

    for (const patient of lockedPatients) {
      await strapi.db.query("api::patient.patient").update({
        where: { id: patient.id },
        data: {
          security: {
            is_locked: false,
            lock_until: null,
            login_attempts: 0,
          },
        },
      });
    }

    return { unlocked: lockedPatients.length };
  },
});
