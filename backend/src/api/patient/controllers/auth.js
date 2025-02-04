const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    /**
     * Patient Login
     * This will validate the patient's credentials and return a JWT token
     * @param {{ request: { body: { email: string; password: string; }; }; badRequest: (message: string) => any; unauthorized: (message: string) => any; send: (data: object) => any; }} ctx
     */
    async login(ctx) {
        const { email, password } = ctx.request.body;

        // Validate that both email and password are provided
        if (!email || !password) {
            return ctx.badRequest("Email and password are required");
        }

        // Find the patient by email
        const patient = await strapi.db.query("api::patient.patient").findOne({
            where: { email },
        });

        // If the patient does not exist, return unauthorized
        if (!patient) {
            return ctx.unauthorized("Invalid email or password");
        }

        // Compare the provided password with the hashed password stored in the database
        const validPassword = await bcrypt.compare(password, patient.password);
        if (!validPassword) {
            return ctx.unauthorized("Invalid email or password");
        }

        // Generate a JWT token with the patient's ID and email
        const token = jwt.sign(
            { id: patient.id, email: patient.email, role: "patient" },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "7d" }
        );

        // Return the JWT and patient data
        return ctx.send({
            token,
            patient: {
                id: patient.id,
                fullname: patient.fullname,
                email: patient.email,
                phone: patient.phone,
            },
        });
    },
};
