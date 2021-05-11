const UserModel = require("../models/user.model");


module.exports.getLogs = async () => {
    const userLogs = await UserModel.find({}, { logs: 1, _id: 0 }).count();
    const amountUsers = await UserModel.find({}, { logs: 1, _id: 0 }).count();
    return userLogs / amountUsers;
}