// path: src/api/doctor/controllers/update.js

module.exports = {
  async updateMe(ctx) {
    const doctor = ctx.state.doctor;

    if (!doctor) {
      return ctx.unauthorized("No doctor data available");
    }

    try {
      const data = ctx.request.body?.data;
      if (!data) {
        return ctx.badRequest("No data provided");
      }

      const doctorService = strapi.service("api::doctor.update");

      let updatedDoctor;

      if (data.personal_info) {
        const { personal_info, city, biography, experience } = data;
        updatedDoctor = await doctorService.updatePersonalInfo(
          doctor.id,
          {
            fullname: personal_info.fullname,
            email: personal_info.email,
          },
          city,
          biography,
          experience
        );
      } else if (data.clinic_info) {
        updatedDoctor = await doctorService.updateClinicInfo(
          doctor.id,
          data.clinic_info
        );
      } else if (data.specialties) {
        updatedDoctor = await doctorService.updateSpecialties(
          doctor.id,
          data.specialties
        );
      } else {
        return ctx.badRequest("No valid update data found");
      }

      return ctx.send({ data: updatedDoctor, meta: {} });
    } catch (error) {
      strapi.log.error("Can Update profile", error);
      return ctx.internalServerError(
        "An error occurred while updating the profile"
      );
    }
  },

  async updateImg(ctx) {
    const doctor = ctx.state.doctor;

    if (!doctor) {
      return ctx.unauthorized("No doctor data available");
    }

    try {
      const imageFile = ctx.request.files?.files || ctx.request.files;

      if (!imageFile) {
        return ctx.badRequest("No image file uploaded");
      }

      const doctorService = strapi.service("api::doctor.update");
      const updatedDoctor = await doctorService.updateImage(doctor, imageFile);

      return ctx.send({ data: updatedDoctor, meta: {} });
    } catch (error) {
      strapi.log.error("Image update error:", error);
      return ctx.internalServerError(
        "An error occurred while updating the image"
      );
    }
  },

  async verification(ctx) {
    const doctor = ctx.state.doctor;
    if (!doctor) {
      return ctx.unauthorized("No doctor data available");
    }

    try {
      const { type } = ctx.request.body;
      const file = ctx.request.files?.file;

      const doctorService = strapi.service("api::doctor.update");

      const updatedDoctor = await doctorService.addVerificationDocument(
        doctor.id,
        type,
        file
      );

      return ctx.send({
        message: "Verification document uploaded",
        doctor: updatedDoctor,
      });
    } catch (error) {
      strapi.log.error("Cannot update verification", error);
      return ctx.internalServerError(
        error.message ||
          "An error occurred while uploading the verification document"
      );
    }
  },
};
