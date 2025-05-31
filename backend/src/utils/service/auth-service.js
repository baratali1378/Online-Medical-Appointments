const jwt = require("jsonwebtoken");

module.exports = {
  generateToken(user, role) {
    return jwt.sign(
      {
        id: user.id,
        email: user.personal_info?.email || user.email, // support both doctor and patient user objects
        role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  },
};
