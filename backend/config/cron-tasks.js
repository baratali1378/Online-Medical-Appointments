const { unlockAccountsJob } = require("../src/extensions/cron/unlockAccout");
const { remindPatients } = require("../src/extensions/cron/remindPatient");

module.exports = {
  unlockAccountsJob: {
    task: unlockAccountsJob,
    options: {
      rule: "*/15 * * * *",
      tz: "Asia/Tehran",
    },
  },
  remindPatientsJob: {
    task: remindPatients,
    options: {
      rule: "15 12 * * *",
      tz: "Asia/Tehran",
    },
  },
};
