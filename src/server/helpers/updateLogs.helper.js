const UserModel = require("../models/user.model")

module.exports.divideLogs = async () => {
    try {
        const users = await UserModel.find({}, { logs: 1 });

        for (let user of users) {
            const logs = Math.floor(user.logs / 2);
            await UserModel.findOneAndUpdate(
                { "_id": user._id },
                { $set: { "logs": logs } },
                { useFindAndModify: false }
            )
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.addLogs = async () => {
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
                { $inc: { "logs": user.logs } },
                { useFindAndModify: false }
            )
        }

    } catch (err) {
        console.log(err)
    }
}