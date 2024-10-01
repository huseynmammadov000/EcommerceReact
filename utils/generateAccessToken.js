const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(
        {email: user.email, id: user.id,username:user.username},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "10m",
        }
    );
};

module.exports = generateAccessToken;