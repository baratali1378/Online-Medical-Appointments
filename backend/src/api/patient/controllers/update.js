const jwt = require("jsonwebtoken");

module.exports = {
  async updateImg(ctx) {
    const patient = ctx.state.patient;

    if (!patient) {
      return ctx.unauthorized("No patient data available");
    }
    try {
      const { files } = ctx.request;
      if (!files || !files.files) {
        return ctx.badRequest("No image file uploaded");
      }

      const imageFile = files.files;

      // Upload image
      const [uploadedImage] = await strapi
        .plugin("upload")
        .service("upload")
        .upload({
          data: {},
          files: imageFile,
        });

      if (!uploadedImage?.id) {
        return ctx.badRequest("Image upload failed");
      }

      // Prepare updated personal_info data with all existing fields + updated image
      const updatedPersonalInfo = {
        // @ts-ignore
        ...patient.personal_info,
        image: uploadedImage.id,
      };

      // Update patient with the updated personal_info component
      const updatedPatient = await strapi.entityService.update(
        "api::patient.patient",
        patient.id,
        {
          data: {
            personal_info: updatedPersonalInfo,
          },
          populate: {
            personal_info: true,
            contact_details: {
              populate: ["city"],
            },
          },
        }
      );

      return ctx.send({ data: updatedPatient, meta: {} });
    } catch (error) {
      strapi.log.error("Image update error:", error);
      return ctx.internalServerError(
        "An error occurred while updating the image"
      );
    }
  },
  async updateMe(ctx) {
    const patient = ctx.state.patient;

    if (!patient) {
      return ctx.unauthorized("No patient data available");
    }
    try {
      const data = ctx.request.body?.data;

      if (!data || !data.personal_info || !data.contact) {
        return ctx.badRequest("Personal Info and Contact must be provided.");
      }

      // Lookup city by name
      let cityId = null;
      if (data.contact.city) {
        const cityEntity = await strapi.entityService.findMany(
          "api::city.city",
          {
            filters: { name: data.contact.city },
            limit: 1,
          }
        );

        if (cityEntity.length > 0) {
          cityId = cityEntity[0].id;
        } else {
          return ctx.badRequest("Invalid city name provided");
        }
      }

      const updatedPatient = await strapi.entityService.update(
        "api::patient.patient",
        patient.id,
        {
          data: {
            personal_info: {
              // @ts-ignore
              ...patient.personal_info,
              ...data.personal_info,
            },
            contact_details: {
              // @ts-ignore
              ...patient.contact_details,
              phone_number: data.contact.phone_number,
              address: data.contact.address,
              postal_code: data.contact.postal_code,
              city: cityId ? cityId : null,
            },
          },
          populate: {
            personal_info: true,
            contact_details: {
              populate: ["city"],
            },
          },
        }
      );

      return ctx.send({
        data: {
          id: updatedPatient.id,
          // @ts-ignore
          personal_info: updatedPatient.personal_info,
          // @ts-ignore
          contact: updatedPatient.contact_details,
        },
        meta: {},
      });
    } catch (error) {
      strapi.log.error("Update error:", error);
      return ctx.internalServerError("An error occurred during update");
    }
  },
};
