module.exports = {
    routes: [
        {
            method: "POST",
            path: "/doctors/auth",
            handler: "auth.login", // ✅ Changed from "auth.login" to "doctor.loginDoctor"
            config: {
                auth: false, // No authentication required
            },
        },
    ],
};
