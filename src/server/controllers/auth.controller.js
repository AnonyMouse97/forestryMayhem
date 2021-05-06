const UserModel = require('../models/user.model');

module.exports.signUp = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.create({ username, password });
        res.status(201).json({ user: user._id });
    } catch (err) {
        console.log(err);
        res.status(200).send({ err });
    }
}