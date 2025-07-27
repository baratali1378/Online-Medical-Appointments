"use strict";

module.exports = () => ({
  async updateMetrics() {
    try {
      strapi.log.info("Starting metrics update...");

      const [doctorsCount, citiesCount, appointmentsCount] = await Promise.all([
        strapi.entityService.count("api::doctor.doctor"),
        strapi.entityService.count("api::city.city"),
        strapi.entityService.count("api::appointment.appointment", {
          filters: { appointment_status: "Completed" },
        }),
      ]);

      const existingMetrics = await strapi.db
        .query("api::metric.metric")
        .findOne({
          where: {},
          orderBy: { createdAt: "desc" },
        });

      if (existingMetrics) {
        // Update existing record
        await strapi.db.query("api::metric.metric").update({
          where: { id: existingMetrics.id },
          data: {
            totalDoctors: doctorsCount,
            totalCities: citiesCount,
            successfulAppointments: appointmentsCount,
            updatedAt: new Date(),
          },
        });
      } else {
        // Create new record
        const newMetrics = await strapi.db.query("api::metric.metric").create({
          data: {
            totalDoctors: doctorsCount,
            totalCities: citiesCount,
            successfulAppointments: appointmentsCount,
          },
        });
      }
    } catch (error) {
      strapi.log.error("❌ Failed to update metrics:");
      strapi.log.error(error);

      // Return error information for better debugging
      return {
        success: false,
        error: error.message,
        stack: error.stack,
      };
    }
  },
});
