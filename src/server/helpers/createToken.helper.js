const jwt = require("jsonwebtoken");

module.exports.createToken = async (id, time) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: time })
}