const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * Patient Signup
   * This will create a new patient and return a JWT token
   * @param {{ request: { body: object }; badRequest: (msg: string) => any; send: (data: object) => any; }} ctx
   */
  async signup(ctx) {
    const { fullname, email, phone, password, gender, birth } =
      ctx.request.body.data;

    // Validate required fields
    if (!fullname || !email || !phone || !password || !gender) {
      return ctx.badRequest(
        "Please provide all required fields: fullname, email, phone, password, gender"
      );
    }

    // Check if the email or phone already exists
    const existingPatient = await strapi.db
      .query("api::patient.patient")
      .findOne({
        where: {
          $or: [{ email }, { phone }],
        },
      });

    if (existingPatient) {
      return ctx.badRequest(
        "A patient with this email or phone number already exists."
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create patient
    const newPatient = await strapi.db.query("api::patient.patient").create({
      data: {
        fullname,
        email,
        phone,
        birth,
        gender,
        password: hashedPassword,
        publishedAt: new Date(),
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newPatient.id, email: newPatient.email, role: "patient" },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Return patient data and token
    return ctx.send({
      token,
      role: "patient",
      patient: {
        id: newPatient.id,
        fullname: newPatient.fullname,
        email: newPatient.email,
        phone: newPatient.phone,
      },
    });
  },
};
