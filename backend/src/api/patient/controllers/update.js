const jwt = require("jsonwebtoken");

module.exports = {
  async updateImg(ctx) {
    const authHeader = ctx.request.header.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ctx.unauthorized("No token provided");
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Type check the decoded JWT
      if (
        typeof decoded !== "object" ||
        decoded === null ||
        !("id" in decoded)
      ) {
        return ctx.unauthorized("Invalid token payload");
      }

      const patientId = decoded.id;

      const { files } = ctx.request;
      if (!files || !files.files) {
        return ctx.badRequest("No image file uploaded");
      }

      const imageFile = files.files; // Assuming single file

      // Upload image
      const [uploadedImage] = await strapi.plugins[
        "upload"
      ].services.upload.upload({
        data: {},
        files: imageFile,
      });

      if (!uploadedImage?.id) {
        return ctx.badRequest("Image upload failed");
      }

      // Fetch patient with personal_info populated
      const patient = await strapi.db.query("api::patient.patient").findOne({
        where: { id: patientId },
        populate: {
          personal_info: true,
        },
      });

      const personalInfoId = patient?.personal_info?.id;

      if (personalInfoId) {
        // Update the image in the personal_info component
        await strapi.db.query("component::personal-info.personal-info").update({
          where: { id: personalInfoId },
          data: {
            image: uploadedImage.id,
          },
        });
      }

      // Fetch updated patient with nested fields populated
      const updatedPatient = await strapi.db
        .query("api::patient.patient")
        .findOne({
          where: { id: patientId },
          populate: {
            personal_info: true,
            contact_details: {
              populate: {
                city: true,
              },
            },
          },
        });

      return ctx.send({ data: updatedPatient, meta: {} });
    } catch (error) {
      strapi.log.error("Image update error:", error);
      return ctx.internalServerError(
        "An error occurred while updating the image"
      );
    }
  },
  async updateMe(ctx) {
    const authHeader = ctx.request.header.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ctx.unauthorized("No token provided");
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Type guard for decoded JWT
      if (
        typeof decoded !== "object" ||
        decoded === null ||
        !("id" in decoded)
      ) {
        return ctx.unauthorized("Invalid token payload");
      }

      const patientId = decoded.id;
      const data = ctx.request.body?.data;

      if (!data) {
        return ctx.badRequest("No data provided");
      }

      // If updating nested components like personal_info or contact_details,
      // we handle them separately:

      // 1. Update personal_info component if present
      if (data.personal_info) {
        // Fetch current patient to get personal_info component ID
        const patient = await strapi.db.query("api::patient.patient").findOne({
          where: { id: patientId },
          populate: { personal_info: true },
        });

        if (patient.personal_info?.id) {
          await strapi.db
            .query("component::personal-info.personal-info")
            .update({
              where: { id: patient.personal_info.id },
              data: data.personal_info,
            });
        }
        delete data.personal_info; // Remove from main update data to avoid conflict
      }

      // 2. Update contact_details component if present
      if (data.contact_details) {
        const patient = await strapi.db.query("api::patient.patient").findOne({
          where: { id: patientId },
          populate: { contact_details: true },
        });

        if (patient.contact_details?.id) {
          await strapi.db.query("component::contact.contact-details").update({
            where: { id: patient.contact_details.id },
            data: data.contact_details,
          });
        } else {
          await strapi.db.query("component::contact.contact-details").create({
            data: data.contact_details,
          });
        }
        delete data.contact_details;
      }

      // Fetch the fully populated updated patient to return
      const populatedPatient = await strapi.db
        .query("api::patient.patient")
        .findOne({
          where: { id: patientId },
          populate: {
            personal_info: true,
            contact_details: {
              populate: { city: true },
            },
          },
        });

      return ctx.send({ data: populatedPatient, meta: {} });
    } catch (error) {
      strapi.log.error("Update error:", error);
      return ctx.internalServerError("An error occurred during update");
    }
  },
};
