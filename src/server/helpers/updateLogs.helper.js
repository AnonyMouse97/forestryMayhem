const UserModel = require("../models/user.model")

module.exports.divideLogs = async (res) => {
    try {
        const divideLogs = await UserModel.updateMany(
            {},
            { $mul: { logs: 0.5 } }
        )

        res.status(200).send({ message: "Half of your logs have been burned down..." })

    } catch (err) {
        console.log(err)
    }
}

module.exports.addLogs = async (res) => {
    try {
        const addLogs = await UserModel.aggregate([
            {
                $lookup:
                {
                    from: "trees",
                    localField: "trees",
                    foreignField: "_id",
                    as: "treeDetail"
                }
            },
            {
                $project:
                {
                    logs: { $sum: "$treeDetail.value" }
                }
            }
        ])

        for (let user of addLogs) {
            await UserModel.findOneAndUpdate(
                { "_id": user._id },
                { $inc: { "logs": user.logs } }
            )
        }

    } catch (err) {
        console.log(err)
    }
}