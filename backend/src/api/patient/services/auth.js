// path: src/api/patient/services/auth
const patientService = require("../../../utils/service/auth-service");
const bcrypt = require("bcryptjs");

const LOCK_TIME_MINUTES = parseInt(process.env.LOCK_TIME_MINUTES) || 15;
const MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5;

module.exports = () => ({
  async login(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const patient = await strapi.query("api::patient.patient").findOne({
      where: { personal_info: { email } },
      populate: {
        personal_info: { populate: ["image"] },
        security: true,
        contact_details: true,
      },
    });

    if (!patient) {
      throw new Error("Invalid email or password");
    }

    // Check if account is locked
    if (
      patient.security?.is_locked &&
      new Date(patient.security.lock_until) > new Date()
    ) {
      // Standardized locked message
      throw new Error("Your account is locked.");
    }

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

      const msg = shouldLock
        ? "Your account is locked."
        : `Invalid credentials. ${MAX_LOGIN_ATTEMPTS - attempts} attempts remaining.`;
      throw new Error(msg);
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
    const token = patientService.generateToken(patient, "patient");

    return {
      token,
      role: "patient",
      user: {
        id: patient.id,
        role: "patient",
        fullname: patient.personal_info.fullname,
        email: patient.personal_info.email,
        phone: patient.contact_details?.phone,
        image: patient.personal_info.image?.url || null,
      },
    };
  },
  async signup({ name, email, password, phone, city, gender }) {
    if (!name || !email || !password || !phone || !city) {
      throw new Error("Please provide all required fields");
    }

    const fullname = name;

    // Check if patient with email or phone exists
    const existingPatients = await strapi.db
      .query("api::patient.patient")
      .findMany({
        where: {
          $or: [
            { personal_info: { email } },
            { contact_details: { phone_number: phone } },
          ],
        },
        populate: ["personal_info", "contact_details"],
      });

    if (existingPatients.length > 0) {
      throw new Error("A patient with this email or phone already exists");
    }

    // Find city by name
    const foundCity = await strapi.db.query("api::city.city").findOne({
      where: { name: city },
    });

    if (!foundCity) {
      throw new Error(`City '${city}' not found`);
    }

    // Create patient entity
    const newPatient = await strapi.entityService.create(
      "api::patient.patient",
      {
        data: {
          personal_info: {
            fullname,
            email,
            gender: gender || null,
          },
          contact_details: {
            phone_number: phone,
            city: foundCity.id,
          },
          security: {
            is_locked: false,
            is_verified: true,
            lock_until: null,
          },
          password: password,
          publishedAt: new Date(),
        },
        populate: ["personal_info"],
      }
    );

    // Generate token
    const token = patientService.generateToken(newPatient, "patient");

    return {
      token,
      role: "patient",
    };
  },
});
