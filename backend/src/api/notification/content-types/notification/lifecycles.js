"use strict";

module.exports = {
  // afterCreate: async (event) => {
  //   const { result, params } = event;
  //   console.log(params);
  //   const isPatient = params.data.patient?.set?.[0]?.id;
  //   const isDoctor = params.data.doctor?.set?.[0]?.id;
  //   const userType = isPatient ? "patient" : isDoctor ? "doctor" : null;
  //   const userId = isPatient || isDoctor;
  //   if (!userType || !userId) {
  //     strapi.log.warn("Missing userType or userId in notification");
  //     return;
  //   }
  //   try {
  //     // @ts-ignore
  //     await strapi.rabbitmq.publishToQueue({
  //       id: result.id,
  //       user_type: userType,
  //       user_id: userId.toString(),
  //       message_type: "message",
  //       title: result.title || "New Notification",
  //       content: result.message,
  //       metadata: {},
  //     });
  //     strapi.log.info(
  //       `📨 Notification sent via RabbitMQ for ${userType} ${userId}`
  //     );
  //   } catch (err) {
  //     strapi.log.error("❌ RabbitMQ publish failed:", err);
  //   }
  // },
};
