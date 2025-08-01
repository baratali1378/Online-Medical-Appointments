"use strict";

module.exports = {
  async list(ctx) {
    try {
      const patient = ctx.state.patient;
      if (!patient) return ctx.unauthorized("Patient authentication required");

      const page = parseInt(ctx.query.page) || 1;
      const pageSize = parseInt(ctx.query.pageSize) || 10;
      const search = ctx.query.search?.toLowerCase() || "";

      console.log(page, pageSize);

      // Base query for patient medical records
      let where = { patient: patient.id };

      // Fetch all records for patient to filter by search
      // (Strapi native filtering on relations can be tricky, so use manual filtering after fetching)
      const allRecords = await strapi.db
        .query("api::medical-record.medical-record")
        .findMany({
          where,
          select: [
            "id",
            "chief_complaint",
            "diagnoses",
            "follow_up_required",
            "follow_up_date",
            "createdAt",
          ],
          populate: {
            doctor: {
              select: ["id"],
              populate: {
                personal_info: {
                  select: ["fullname"],
                },
              },
            },
            appointment: {
              select: ["id", "date"],
            },
          },
          orderBy: { createdAt: "desc" },
        });

      // Filter client-side for search (simple case-insensitive match in chief_complaint or doctor fullname)
      const filteredRecords = allRecords.filter((record) => {
        if (!search) return true;
        const chiefComplaint = record.chief_complaint?.toLowerCase() || "";
        const doctorName =
          record.doctor?.personal_info?.fullname?.toLowerCase() || "";
        return chiefComplaint.includes(search) || doctorName.includes(search);
      });

      // Pagination on filtered records
      const total = filteredRecords.length;
      const pageCount = Math.ceil(total / pageSize);
      const paginatedRecords = filteredRecords.slice(
        (page - 1) * pageSize,
        page * pageSize
      );

      return ctx.send({
        data: paginatedRecords,
        meta: {
          total,
          page,
          pageSize,
          pageCount,
        },
      });
    } catch (err) {
      strapi.log.error("Error fetching patient medical records:", err);
      return ctx.internalServerError("Failed to fetch medical records");
    }
  },
  async detail(ctx) {
    try {
      const patient = ctx.state.patient;
      if (!patient) return ctx.unauthorized("Patient authentication required");

      const { id } = ctx.params;
      const record = await strapi.db
        .query("api::medical-record.medical-record")
        .findOne({
          where: { id, patient: patient.id },
          populate: {
            doctor: {
              select: ["id"],
              populate: {
                personal_info: {
                  fields: ["fullname", "email"], // More details allowed in detail
                },
              },
            },
            appointment: true,
            files: true,
          },
        });

      if (!record) return ctx.notFound("Medical record not found");

      return ctx.send({ data: record });
    } catch (err) {
      strapi.log.error("Error fetching medical record details:", err);
      return ctx.internalServerError("Failed to fetch medical record");
    }
  },
};
