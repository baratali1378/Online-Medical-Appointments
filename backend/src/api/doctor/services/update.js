// path: src/api/doctor/services/update.js

module.exports = () => ({
  async updatePersonalInfo(
    doctorId,
    personalInfoData,
    cityData,
    biography,
    experience
  ) {
    return await strapi.entityService.update("api::doctor.doctor", doctorId, {
      data: {
        personal_info: {
          ...personalInfoData,
        },
        city: cityData ? { id: cityData.id } : undefined,
        biography,
        experience,
      },
      populate: {
        personal_info: true,
        city: true,
      },
    });
  },

  async updateClinicInfo(doctorId, clinicInfo) {
    return await strapi.entityService.update("api::doctor.doctor", doctorId, {
      data: {
        clinic_info: clinicInfo,
      },
      populate: {
        clinic_info: true,
      },
    });
  },

  async updateSpecialties(doctorId, specialties) {
    const specialtiesIds = specialties.map((s) => s.id);
    return await strapi.entityService.update("api::doctor.doctor", doctorId, {
      data: {
        specialties: specialtiesIds,
      },
      populate: {
        specialties: true,
      },
    });
  },

  async updateAvailableSlots(doctorId, availableSlots) {
    const slotsData = availableSlots.map((slot) => ({
      days: slot.days,
      start_time: slot.start_time,
      end_time: slot.end_time,
    }));

    return await strapi.entityService.update("api::doctor.doctor", doctorId, {
      data: {
        available_slots: slotsData,
      },
      populate: {
        available_slots: true,
      },
    });
  },

  async updateImage(doctor, imageFile) {
    try {
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

      const personalInfoUpdate = {
        fullname: doctor.personal_info?.fullname || "",
        email: doctor.personal_info?.email || "",
        gender: doctor.personal_info?.gender || null,
        birth: doctor.personal_info?.birth || null,
        image: uploadedImage.id,
      };

      return await strapi.entityService.update(
        "api::doctor.doctor",
        doctor.id,
        {
          data: {
            // @ts-ignore
            personal_info: personalInfoUpdate,
          },
          populate: {
            personal_info: true,
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  },

  async addVerificationDocument(doctorId, type, file) {
    const validTypes = [
      "Medical License",
      "ID Card",
      "Degree",
      "Board Certification",
    ];

    if (!validTypes.includes(type)) {
      throw new Error("Invalid document type");
    }

    if (!file) {
      throw new Error("File is required");
    }

    // Upload file
    const uploadedFiles = await strapi
      .plugin("upload")
      .service("upload")
      .upload({
        data: {},
        files: file,
      });

    if (!uploadedFiles || uploadedFiles.length === 0) {
      throw new Error("Failed to upload file");
    }

    const uploadedFile = uploadedFiles[0];

    // Get existing verifications
    const existingDoctor = await strapi.entityService.findOne(
      "api::doctor.doctor",
      doctorId,
      {
        populate: ["verification"],
      }
    );

    // @ts-ignore
    const existingVerifications = existingDoctor.verification || [];

    // Create new verification entry
    const newVerification = {
      type,
      current_status: "pending",
      uploaded_at: new Date(),
      file: uploadedFile.id,
    };

    // Update doctor with new verification list
    return await strapi.entityService.update("api::doctor.doctor", doctorId, {
      data: {
        verification: [...existingVerifications, newVerification],
      },
    });
  },
});
