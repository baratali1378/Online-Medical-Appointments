const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: path.join(__dirname, "../../../.tmp/test.db"),
    },
    useNullAsDefault: true,
    debug: false,
    pool: {
      min: 0,
      max: 1,
      idleTimeoutMillis: 30000,
    },
  },
});
