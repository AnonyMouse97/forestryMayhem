const UserModel = require("../models/user.model");


module.exports.getLogs = async () => {
    const totalLogs = await UserModel.aggregate([{
        $group: { _id: null, total: { $sum: "$logs" } }
    }]);
    const totalUsers = await UserModel.find({}, { userName: 1, _id: 0 }).countDocuments();

    return totalLogs[0].total / totalUsers;
}