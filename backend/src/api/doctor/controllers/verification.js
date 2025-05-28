module.exports = {
  async verification(ctx) {
    const doctor = ctx.state.doctor;

    if (!doctor) {
      return ctx.unauthorized("No doctor data available");
    }

    try {
      const { type } = ctx.request.body;

      const validTypes = [
        "Medical License",
        "ID Card",
        "Degree",
        "Board Certification",
      ];

      if (!validTypes.includes(type)) {
        return ctx.badRequest("Invalid document type");
      }

      if (!ctx.request.files || !ctx.request.files.file) {
        return ctx.badRequest("File is required");
      }

      const rawFile = ctx.request.files.file;

      // ✅ Upload file first
      const uploadedFiles = await strapi.plugins[
        "upload"
      ].services.upload.upload({
        data: {}, // metadata
        files: rawFile,
      });

      if (!uploadedFiles || uploadedFiles.length === 0) {
        return ctx.internalServerError("Failed to upload file");
      }

      const uploadedFile = uploadedFiles[0];

      // ✅ Construct new verification component
      const newVerification = {
        type,
        current_status: "pending",
        uploaded_at: new Date(),
        file: uploadedFile.id, // must be file ID
      };

      // ✅ Get existing verifications
      const existingDoctor = await strapi.entityService.findOne(
        "api::doctor.doctor",
        doctor.id,
        { populate: ["verification"] }
      );

      // @ts-ignore
      const existingVerifications = existingDoctor.verification || [];

      // ✅ Add new verification
      const updatedDoctor = await strapi.entityService.update(
        "api::doctor.doctor",
        doctor.id,
        {
          data: {
            verification: [...existingVerifications, newVerification],
          },
        }
      );

      return ctx.send({
        message: "Verification document uploaded",
        doctor: updatedDoctor,
      });
    } catch (error) {
      strapi.log.error("Cannot update verification", error);
      return ctx.internalServerError(
        "An error occurred while uploading the verification document"
      );
    }
  },
};
