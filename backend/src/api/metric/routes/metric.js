"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/metrics/totals",
      handler: "metric.getTotals",
      config: {
        auth: false, // set true if authentication is required
      },
    },
  ],
};
