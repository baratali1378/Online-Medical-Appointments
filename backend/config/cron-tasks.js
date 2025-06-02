async function unlockAccountsJob({ strapi }) {
  const startTime = new Date();
  strapi.log.info(
    `[Cron][${startTime.toISOString()}] Starting account unlock job...`
  );

  try {
    // Unlock patient accounts with timeout protection
    const patientPromise = strapi
      .service("api::patient.security")
      .unlockExpiredAccounts()
      .catch((err) => {
        strapi.log.error("[Cron] Patient unlock error:", err);
        return { unlocked: 0, error: err.message };
      });

    // Unlock doctor accounts with timeout protection
    const doctorPromise = strapi
      .service("api::doctor.security")
      .unlockExpiredAccounts()
      .catch((err) => {
        strapi.log.error("[Cron] Doctor unlock error:", err);
        return { unlocked: 0, error: err.message };
      });

    // Wait for both operations to complete
    const [patientResult, doctorResult] = await Promise.all([
      patientPromise,
      doctorPromise,
    ]);

    // @ts-ignore
    const duration = new Date() - startTime;
    strapi.log.info(`[Cron] Completed in ${duration}ms`);
    strapi.log.info(`[Cron] Patients unlocked: ${patientResult.unlocked || 0}`);
    strapi.log.info(`[Cron] Doctors unlocked: ${doctorResult.unlocked || 0}`);

    if (patientResult.error || doctorResult.error) {
      throw new Error("Partial failure occurred during unlock");
    }
  } catch (error) {
    strapi.log.error("[Cron] Job failed:", error);
  }
}

async function remindPatients({ strapi }) {
  strapi.log.info("[Cron] Starting patient reminders job...");
}

module.exports = {
  unlockAccountsJob: {
    task: unlockAccountsJob,
    options: {
      rule: "*/10 * * * *",
      tz: "Asia/Tehran",
    },
  },
  remindPatientsJob: {
    task: remindPatients,
    options: {
      rule: "0 19 * * *",
      tz: "Asia/Tehran",
    },
  },
};
