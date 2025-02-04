module.exports = {
    routes: [
        {
            method: "POST",
            path: "/doctors/auth",
            handler: "auth.login",
            config: {
                auth: false, // No authentication required
            },
        },
    ],
};
