const {
  unlockExpiredAccountsForCollection,
} = require("../../../utils/service/security");

module.exports = ({ strapi }) => ({
  async unlockExpiredAccounts() {
    return await unlockExpiredAccountsForCollection(
      strapi,
      "api::doctor.doctor"
    );
  },
});
