const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_MINUTES = 15;

module.exports = {
  async login(ctx) {
    try {
      const { email, password } = ctx.request.body;

      if (!email || !password) {
        return ctx.badRequest("Email and password are required.");
      }

      // Find patient with populated fields
      const patient = await strapi.query("api::patient.patient").findOne({
        where: { personal_info: { email: email } },
        populate: {
          personal_info: { populate: ["image"] },
          security: true,
          contact_details: true,
        },
      });

      if (!patient) {
        return ctx.unauthorized("Invalid email or password");
      }

      console.log("Stored Hash:", patient.password);
      console.log(
        "Password Match:",
        await bcrypt.compare(password, patient.password)
      );

      // Account lock check
      if (
        patient.security?.is_locked &&
        new Date(patient.security.lock_until) > new Date()
      ) {
        const lockTime = new Date(patient.security.lock_until).getTime();
        const currentTime = new Date().getTime();
        const timeDiffMs = lockTime - currentTime;
        const minutesLeft = Math.ceil(timeDiffMs / (1000 * 60));
        return ctx.unauthorized(
          `Account locked. Try again in ${minutesLeft} minutes.`
        );
      }

      // Password validation
      const validPassword = await bcrypt.compare(password, patient.password);
      if (!validPassword) {
        const attempts = (patient.security?.login_attempts || 0) + 1;
        const shouldLock = attempts >= MAX_LOGIN_ATTEMPTS;
        const lockUntil = shouldLock
          ? new Date(Date.now() + LOCK_TIME_MINUTES * 60 * 1000)
          : null;

        await strapi.query("api::patient.patient").update({
          where: { id: patient.id },
          data: {
            security: {
              login_attempts: attempts,
              last_failed_login: new Date(),
              ...(shouldLock && {
                is_locked: true,
                lock_until: lockUntil,
              }),
            },
          },
        });

        return ctx.unauthorized(
          shouldLock
            ? `Account locked. Try again after ${LOCK_TIME_MINUTES} minutes.`
            : `Invalid credentials. ${MAX_LOGIN_ATTEMPTS - attempts} attempts remaining.`
        );
      }

      // Reset failed attempts
      await strapi.query("api::patient.patient").update({
        where: { id: patient.id },
        data: {
          security: {
            login_attempts: 0,
            is_locked: false,
            lock_until: null,
            last_login: new Date(),
          },
        },
      });

      // Generate token
      const token = jwt.sign(
        {
          id: patient.id,
          email: patient.personal_info.email,
          role: "patient",
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        token,
        role: "patient",
        user: {
          id: patient.id,
          role: "patient",
          fullname: patient.personal_info.fullname,
          email: patient.personal_info.email,
          phone: patient.contact_details?.phone,
          image: patient.personal_info.image?.url || null, // 🛡️ Safe access
        },
      };
    } catch (error) {
      strapi.log.error("Login error:", error);
      return ctx.internalServerError("Something went wrong during login");
    }
  },
};
