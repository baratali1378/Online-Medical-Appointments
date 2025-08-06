"use strict";

module.exports = ({ strapi }) => ({
  async create(data) {
    return await strapi.entityService.create(
      "api::medical-record.medical-record",
      {
        data: {
          ...data,
          publishedAt: new Date(),
        },
      }
    );
  },

  async update(id, data) {
    return await strapi.entityService.update(
      "api::medical-record.medical-record",
      id,
      {
        data,
      }
    );
  },

  async findByDoctor(doctorId) {
    return await strapi.entityService.findMany(
      "api::medical-record.medical-record",
      {
        filters: { doctor: doctorId },
        populate: {
          patient: {
            populate: {
              personal_info: {
                populate: ["image"], // Include the media field
              },
            },
          },
          appointment: true,
          files: true,
        },
      }
    );
  },

  async findByDoctorAndPatient(doctorId, patientId) {
    return await strapi.entityService.findMany(
      "api::medical-record.medical-record",
      {
        filters: { doctor: doctorId, patient: patientId },
        populate: {
          patient: {
            populate: {
              personal_info: {
                populate: ["image"], // Include the media field
              },
            },
          },
          appointment: true,
          files: true,
        },
      }
    );
  },

  async findByPatient(patientId) {
    return await strapi.entityService.findMany(
      "api::medical-record.medical-record",
      {
        filters: { patient: patientId },
        populate: ["patient", "appointment", "files"],
      }
    );
  },

  // @ts-ignore
  async findOne(id, { doctorId, patientId } = {}) {
    const record = await strapi.entityService.findOne(
      "api::medical-record.medical-record",
      id,
      {
        populate: {
          doctor: true,
          patient: {
            populate: {
              personal_info: {
                populate: ["image"],
              },
            },
          },
          appointment: true,
          files: true,
        },
      }
    );

    if (!record) {
      throw new Error("Record not found");
    }

    if (doctorId && record.doctor?.id !== doctorId) {
      throw new Error("Unauthorized: doctor mismatch");
    }

    if (patientId && record.patient?.id !== patientId) {
      throw new Error("Unauthorized: patient mismatch");
    }

    return record;
  },
});
