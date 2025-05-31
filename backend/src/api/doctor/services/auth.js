const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorToken = require("../../../utils/service/auth-service");

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_MINUTES = 15;

module.exports = () => ({
  async login({ email, password }) {
    if (!email || !password) throw new Error("Email and password are required");

    const doctor = await strapi.query("api::doctor.doctor").findOne({
      where: { personal_info: { email } },
      populate: {
        personal_info: { populate: ["image"] },
        security: true,
        contact_details: true,
      },
    });

    if (!doctor) throw new Error("Invalid email or password");

    if (
      doctor.security?.is_locked &&
      new Date(doctor.security.lock_until) > new Date()
    ) {
      const minutesLeft = Math.ceil(
        // @ts-ignore
        (new Date(doctor.security.lock_until) - new Date()) / 60000
      );
      throw new Error(`Account locked. Try again in ${minutesLeft} minutes.`);
    }

    const validPassword = await bcrypt.compare(password, doctor.password);
    if (!validPassword) {
      const attempts = (doctor.security?.login_attempts || 0) + 1;
      const shouldLock = attempts >= MAX_LOGIN_ATTEMPTS;

      await strapi.query("api::doctor.doctor").update({
        where: { id: doctor.id },
        data: {
          security: {
            login_attempts: attempts,
            last_failed_login: new Date(),
            ...(shouldLock && {
              is_locked: true,
              lock_until: new Date(Date.now() + LOCK_TIME_MINUTES * 60000),
            }),
          },
        },
      });

      throw new Error(
        shouldLock
          ? `Account locked. Try again after ${LOCK_TIME_MINUTES} minutes.`
          : `Invalid credentials. ${MAX_LOGIN_ATTEMPTS - attempts} attempts remaining.`
      );
    }

    // Reset failed attempts
    await strapi.query("api::doctor.doctor").update({
      where: { id: doctor.id },
      data: {
        security: {
          login_attempts: 0,
          is_locked: false,
          lock_until: null,
          last_login: new Date(),
        },
      },
    });

    const token = doctorToken.generateToken(doctor, "doctor");

    return {
      token,
      role: "doctor",
      user: {
        id: doctor.id,
        role: "doctor",
        fullname: doctor.personal_info.fullname,
        email: doctor.personal_info.email,
        phone: doctor.contact_details?.phone,
        image: doctor.personal_info.image?.url || null,
      },
    };
  },

  async signup(data) {
    const { name, email, password, experience, city } = data;

    if (!name || !email || !password || !experience || !city) {
      throw new Error("Please provide all required fields");
    }

    const existingDoctors = await strapi.db
      .query("api::doctor.doctor")
      .findMany({
        where: { personal_info: { email } },
      });

    if (existingDoctors.length > 0) {
      throw new Error("A doctor with this email already exists");
    }

    const foundCity = await strapi.db.query("api::city.city").findOne({
      where: { name: city },
    });

    if (!foundCity) {
      throw new Error(`City '${city}' not found`);
    }

    const newDoctor = await strapi.entityService.create("api::doctor.doctor", {
      data: {
        personal_info: {
          fullname: name,
          email,
        },
        security: {
          is_verified: false,
          is_locked: false,
        },
        experience,
        city: foundCity.id,
        password,
        publishedAt: new Date(),
      },
    });

    const token = doctorToken.generateToken(newDoctor, "doctor");

    return {
      token,
      role: "doctor",
    };
  },
});
