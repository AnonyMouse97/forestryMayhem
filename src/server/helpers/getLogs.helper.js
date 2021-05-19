const UserModel = require("../models/user.model");


module.exports.getLogs = async () => {
    const totalLogs = await UserModel.aggregate([{
        $group: { _id: null, total: { $sum: "$logs" } }
    }]);
    const totalUsers = await UserModel.find({}, { userName: 1, _id: 0 }).countDocuments();

    if (totalUsers == 0) {
        return 2000
    } else {
        return totalLogs[0].total / totalUsers;
    }
}