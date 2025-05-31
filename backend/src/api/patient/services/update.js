module.exports = {
  async updateImage(patient, imageFile) {
    if (!imageFile) {
      throw new Error("No image file provided");
    }

    const [uploadedImage] = await strapi
      .plugin("upload")
      .service("upload")
      .upload({
        data: {},
        files: imageFile,
      });

    if (!uploadedImage?.id) {
      throw new Error("Image upload failed");
    }

    const updatedPersonalInfo = {
      ...patient.personal_info,
      image: uploadedImage.id,
    };

    return await strapi.entityService.update(
      "api::patient.patient",
      patient.id,
      {
        data: {
          personal_info: updatedPersonalInfo,
        },
        populate: {
          personal_info: true,
          contact_details: { populate: ["city"] },
        },
      }
    );
  },

  async updateProfile(patient, data) {
    if (!data || !data.personal_info || !data.contact) {
      throw new Error("Personal Info and Contact must be provided");
    }

    // Resolve city
    let cityId = null;
    if (data.contact.city) {
      const cities = await strapi.entityService.findMany("api::city.city", {
        filters: { name: data.contact.city },
        limit: 1,
      });

      if (cities.length === 0) {
        throw new Error("Invalid city name provided");
      }

      cityId = cities[0].id;
    }

    return await strapi.entityService.update(
      "api::patient.patient",
      patient.id,
      {
        data: {
          personal_info: {
            ...patient.personal_info,
            ...data.personal_info,
          },
          contact_details: {
            ...patient.contact_details,
            phone_number: data.contact.phone_number,
            address: data.contact.address,
            postal_code: data.contact.postal_code,
            city: cityId,
          },
        },
        populate: {
          personal_info: true,
          contact_details: { populate: ["city"] },
        },
      }
    );
  },
};
