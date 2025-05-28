module.exports = {
  async updateMe(ctx) {
    const doctor = ctx.state.doctor;

    if (!doctor) {
      return ctx.unauthorized("No doctor data available");
    }

    try {
      const data = ctx.request.body?.data;

      console.log("data", data);

      if (data && data.personal_info) {
        const { personal_info, city, biography, experience } = data;

        const updatedDoctor = await strapi.entityService.update(
          "api::doctor.doctor",
          doctor.id,
          {
            data: {
              personal_info: {
                ...doctor.personal_info,
                fullname: personal_info.fullname,
                email: personal_info.email,
              },
              city: {
                id: city.id,
              },
              biography: biography,
              experience: experience,
            },
            populate: {
              personal_info: true,
              city: true,
            },
          }
        );

        return ctx.send({ data: updatedDoctor, meta: {} });
      } else if (data && data.phone_number) {
        const updatedDoctor = await strapi.entityService.update(
          "api::doctor.doctor",
          doctor.id,
          {
            data: {
              phone_number: data.phone_number.map((phone) => {
                if (phone.id) {
                  return { id: phone.id, text: phone.text };
                } else {
                  return { text: phone.text }; // new entry
                }
              }),
            },
            populate: {
              phone_number: true,
            },
          }
        );

        return ctx.send({ data: updatedDoctor, meta: {} });
      } else if (data && data.specialties) {
        const updatedDoctor = await strapi.entityService.update(
          "api::doctor.doctor",
          doctor.id,
          {
            data: {
              specialties: data.specialties.map((s) => s.id),
            },
            populate: {
              specialties: true,
            },
          }
        );
        return ctx.send({ data: updatedDoctor, meta: {} });
      } else if (data && data.available_slots) {
        const updatedDoctor = await strapi.entityService.update(
          "api::doctor.doctor",
          doctor.id,
          {
            data: {
              available_slots: data.available_slots.map((slot) => ({
                days: slot.days,
                start_time: slot.start_time,
                end_time: slot.end_time,
              })),
            },
            populate: {
              available_slots: true,
            },
          }
        );

        return ctx.send({ data: updatedDoctor, meta: {} });
      }
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

      const updatedDoctor = await strapi.entityService.update(
        "api::doctor.doctor",
        doctor.id,
        {
          data: {
            // @ts-ignore
            personal_info: {
              image: uploadedImage.id,
            },
          },
          populate: {
            personal_info: true,
          },
        }
      );

      return ctx.send({ data: updatedDoctor, meta: {} });
    } catch (error) {
      strapi.log.error("Image update error:", error);
      return ctx.internalServerError(
        "An error occurred while updating the image"
      );
    }
  },
};
