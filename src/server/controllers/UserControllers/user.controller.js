const UserModel = require("../../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

// display all users in the DB with the path "localhost:APP_PORT/api/user"
module.exports.getAllUsers = async (req, res) => {
    // We don't want sensitive infos on the client's side -> remove password from the request
    const users = await UserModel.find().select("-password -email");
    res.status(200).json(users);

};

// find one user in particular using his ID
module.exports.userInfo = (req, res) => {
    // params = parameters in url, body = parameters in forms
    console.log(req.params);
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`ID unknown: ${req.params.id}`);
    }
    UserModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(`ID unknown: ${err}`);
        }
    }).select("-password -email");
};
