const UserModel = require("../models/user.model")

module.exports.divideLogs = async (req, res) => {
    try {
        const users = await UserModel.find().select("-password -email")

        for (const user of users) {
            const logsDivided = Math.floor(user.logs / 2)

            UserModel.findOneAndUpdate(
                { _id: user._id },
                {
                    $set: {
                        logs: logsDivided
                    }
                },
                { new: true, upsert: true, setDefaultsOnInsert: true, useFindAndModify: false },
                (err, docs) => {
                    if (!err) return res.send(docs)
                    if (err) return res.status(500).send({ message: err })
                }
            )
            console.log(user.id)
        }
        // users.forEach((user) => {
        //     const logsDivided = Math.floor(user.logs / 2)
        //     await UserModel.findOneAndUpdate(
        //         { _id: user._id },
        //         {
        //             $set: {
        //                 logs: logsDivided
        //             }
        //         },
        //         { new: true, upsert: true, setDefaultsOnInsert: true, useFindAndModify: false },
        //         (err, docs) => {
        //             if (!err) return res.send(docs)
        //             if (err) return res.status(500).send({ message: err })
        //         }
        //     )
        // })
    } catch (err) {
        console.log(err)
    }
}