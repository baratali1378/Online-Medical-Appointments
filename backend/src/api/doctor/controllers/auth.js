const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    /**
     * @param {{ request: { body: { email: any; password: any; }; }; badRequest: (arg0: string) => any; unauthorized: (arg0: string) => any; send: (arg0: { token: string; doctor: { id: any; name: any; email: any; profile_picture: any; }; }) => any; }} ctx
     */
    async login(ctx) {
        const { email, password } = ctx.request.body;

        if (!email || !password) {
            return ctx.badRequest("Email and password are required");
        }

        // Find the doctor by email
        const doctor = await strapi.db.query("api::doctor.doctor").findOne({
            where: { email },
        });

        if (!doctor) {
            return ctx.unauthorized("Invalid email or password");
        }

        // Check password
        const validPassword = await bcrypt.compare(password, doctor.password);

        if (!validPassword) {
            return ctx.unauthorized("Invalid email or password");
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: doctor.id, email: doctor.email, role: "doctor" },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "7d" }
        );

        // Return response
        return ctx.send({
            token,
            doctor: {
                id: doctor.id,
                name: doctor.name,
                email: doctor.email,
                profile_picture: doctor.profile_picture,
            },
        });
    },
};
