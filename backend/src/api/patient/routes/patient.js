module.exports = {
    routes: [
        {
            method: "POST",
            path: "/patients/login",
            handler: "auth.login",  // This should match the method name in the controller
            config: {
                auth: false, // No authentication required for login route
            },
        },
    ],
};
