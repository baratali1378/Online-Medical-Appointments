async function remindPatients({ strapi }) {
  const startTime = new Date();
  strapi.log.info(
    `[Cron][${startTime.toISOString()}] Starting patient reminders job...`
  );
  try {
    const patientNotificaions = strapi
      .service("api::notification.patient-reminders")
      .sendPatientReminders();
    const [patientResult] = await Promise.all([patientNotificaions]);
    // @ts-ignore
    const duration = new Date() - startTime;
    strapi.log.info(`[Cron] Completed in ${duration}ms`);
    strapi.log.info(
      `[Cron] Number of Apponitments ${patientResult.appointmetns}`
    );
  } catch (error) {
    strapi.log.error("Error Happened during reminding patients!");
  }
}

module.exports = {
  remindPatients,
};
