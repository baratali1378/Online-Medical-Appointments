// src/api/medical-record/utils/sanitize.js

async function sanitizeOutput(data, strapi) {
  const schema = strapi.getModel("api::medical-record.medical-record");
  return await strapi.contentAPI.sanitize.output(data, schema);
}

module.exports = {
  sanitizeOutput,
};
