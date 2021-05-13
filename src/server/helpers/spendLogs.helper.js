const UserModel = require("../models/user.model");

module.exports.spendLogs = async (id, value, res) => {
    try {
        const user = await UserModel.findById(id, function (err, result) {
            if (err) {
                res.send(err)
            }
            else {
                return result
            }
        })
        const logsBeforePurchase = user.logs
        const spent = { logs: logsBeforePurchase - value }

        await UserModel.findByIdAndUpdate(id, spent,
            { new: true, upsert: true, useFindAndModify: false },
            (err, docs) => {
                if (!err) res.status(201).json(docs)
                else return res.status(400).json(err)
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}