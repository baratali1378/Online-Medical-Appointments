const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require("../../../utils/error"); // adjust the path if needed

module.exports = {
  async updateImage(patient, imageFile) {
    if (!imageFile) {
      throw new BadRequestError("No image file provided");
    }

    const [uploadedImage] = await strapi
      .plugin("upload")
      .service("upload")
      .upload({
        data: {},
        files: imageFile,
      });

    if (!uploadedImage?.id) {
      throw new ConflictError("Image upload failed");
    }

    const personalInfoUpdate = {
      fullname: patient.personal_info?.fullname || "",
      email: patient.personal_info?.email || "",
      gender: patient.personal_info?.gender || null,
      birth: patient.personal_info?.birth || null,
      image: uploadedImage.id,
    };

    const updatedPatient = await strapi.entityService.update(
      "api::patient.patient",
      patient.id,
      {
        data: {
          personal_info: personalInfoUpdate,
        },
        populate: {
          personal_info: true,
          contact_details: { populate: ["city"] },
        },
      }
    );

    // Remove sensitive data
    if (updatedPatient.password) {
      delete updatedPatient.password;
    }

    return updatedPatient;
  },

  async updateProfile(patient, data) {
    if (!data || !data.personal_info || !data.contact) {
      throw new BadRequestError("Personal Info and Contact must be provided");
    }

    // Resolve city
    let cityId = null;

    if (data.contact.city) {
      const city = await strapi.db.query("api::city.city").findOne({
        where: { name: data.contact.city }, // search by city name
      });

      if (city) {
        cityId = city.id;
      }
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
