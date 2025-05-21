const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * Patient Signup
   */
  async signup(ctx) {
    const {
      fullname,
      email,
      phone,
      password,
      gender,
      city, // this should be the city ID
    } = ctx.request.body.data;

    // Validate required fields
    if (!fullname || !email || !phone || !password || !gender || !city) {
      return ctx.badRequest(
        "Please provide all required fields: fullname, email, phone, password, gender, city"
      );
    }

    // Check if email or phone already exists (in personal_info and contact_details)
    const existing = await strapi.db.query("api::patient.patient").findOne({
      where: {
        $or: [
          { personal_info: { email } },
          { contact_details: { phone_number: phone } },
        ],
      },
      populate: ["personal_info", "contact_details"],
    });

    if (existing) {
      return ctx.badRequest(
        "A patient with this email or phone already exists."
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create patient with components
    const newPatient = await strapi.db.query("api::patient.patient").create({
      data: {
        personal_info: {
          fullname,
          email,
          gender,
          password: hashedPassword,
        },
        contact_details: {
          phone_number: phone,
          city: city, // city should be an ID
        },
        publishedAt: new Date(),
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newPatient.id, email, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return ctx.send({
      token,
      role: "patient",
    });
  },
};
