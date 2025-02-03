module.exports = {
    routes: [
        {
            method: "POST",
            path: "/doctors/login",
            handler: "auth.login",
            config: {
                auth: false, // No authentication required
            },
        },
    ],
};
