module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      includeUnparsed: true, // needed for Stripe webhook
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
