const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async updateMe(ctx) {
    const authHeader = ctx.request.header.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ctx.unauthorized("No token provided");
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof decoded !== "object" || !decoded.id) {
        return ctx.unauthorized("Invalid token payload");
      }

      const patientId = decoded.id;
      const data = ctx.request.body?.data;

      if (!data) {
        return ctx.badRequest("No data provided");
      }

      const updateData = { ...data };

      const updatedPatient = await strapi.db
        .query("api::patient.patient")
        .update({
          where: { id: patientId },
          data: updateData,
        });

      const safeResponse = {
        id: updatedPatient.id,
        fullname: updatedPatient.fullname,
        email: updatedPatient.email,
        phone: updatedPatient.phone,
        birth: updatedPatient.birth,
        gender: updatedPatient.gender,
        slug_id: updatedPatient.slug_id,
        image: updatedPatient.image,
      };

      return ctx.send({ data: safeResponse, meta: {} });
    } catch (error) {
      strapi.log.error("Update error:", error);
      return ctx.internalServerError("An error occurred during update");
    }
  },
  async updateImg(ctx) {
    const authHeader = ctx.request.header.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ctx.unauthorized("No token provided");
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof decoded !== "object" || !decoded.id) {
        return ctx.unauthorized("Invalid token payload");
      }

      const patientId = decoded.id;

      const { files } = ctx.request;
      if (!files || !files.files) {
        return ctx.badRequest("No image file uploaded");
      }

      const imageFile = files.files; // Single file expected

      const [uploadedImage] = await strapi.plugins[
        "upload"
      ].services.upload.upload({
        data: {}, // Optional additional data
        files: imageFile,
      });

      if (!uploadedImage || !uploadedImage.id) {
        return ctx.badRequest("Image upload failed");
      }

      const updatedPatient = await strapi.db
        .query("api::patient.patient")
        .update({
          where: { id: patientId },
          data: {
            image: uploadedImage.id, // Assuming 'image' is a media field (relation)
          },
        });

      const safeResponse = {
        id: updatedPatient.id,
        fullname: updatedPatient.fullname,
        email: updatedPatient.email,
        phone: updatedPatient.phone,
        birth: updatedPatient.birth,
        gender: updatedPatient.gender,
        slug_id: updatedPatient.slug_id,
        image: updatedPatient.image,
      };

      return ctx.send({ data: safeResponse, meta: {} });
    } catch (error) {
      strapi.log.error("Image update error:", error);
      return ctx.internalServerError(
        "An error occurred while updating the image"
      );
    }
  },
};
