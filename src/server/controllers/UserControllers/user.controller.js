const UserModel = require("../../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

// display all users in the DB with the path "localhost:APP_PORT/api/user"
module.exports.getAllUsers = async (req, res) => {
    // We don't want sensitive infos on the client's side -> remove password from the request
    const users = await UserModel.find().select("-password -email");
    res.status(200).json(users);
};

// // find one user in particular using his ID
// module.exports.userInfo = (req, res) => {
//     // params = parameters in url, body = parameters in forms
//     if (!ObjectId.isValid(req.params.id)) {
//         return res.status(400).send(`ID unknown: ${req.params.id}`);
//     }
//     UserModel.findById(req.params.id, (err, data) => {
//         if (!err) {
//             res.send(data);
//         } else {
//             console.log(`ID unknown: ${err}`);
//         }
//     }).select("-password -email");
// };

module.exports.userInfo = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`ID unknown: ${req.params.id}`);
    }

    const info = await UserModel.aggregate([
        {
            $match: {
                _id: ObjectId(req.params.id)
            }
        },
        {
            $unset: ["password", "email"]
        },
        {
            $lookup:
            {
                from: "trees",
                localField: "trees",
                foreignField: "_id",
                as: "treeDetail"
            }
        }
    ])
    console.log("test")
    res.status(200).json(info)
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`ID unknown: ${req.params.id}`);
    }

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    userName: req.body.userName,
                    password: req.body.password,
                    profilePic: req.body.profilePic,
                    color: req.body.color
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true, useFindAndModify: false },
            (err, docs) => {
                if (!err) return res.send(docs)
                if (err) return res.status(500).send({ message: err })
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err })

    }
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`ID unknown: ${req.params.id}`);
    }

    try {
        await UserModel.remove({ _id: req.params.id }).exec()
        res.status(200).json({ message: "Your account has been successfully deleted" })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}
