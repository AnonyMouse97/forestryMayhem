const UserModel = require("../models/user.model");


module.exports.getLogs = async () => {
    // Mongoose 5.x disallows passing a spread of operators to `Model.aggregate()`.
    // Instead of `Model.aggregate({ $match }, { $skip })`, do `Model.aggregate([{ $match }, { $skip }])`
    const totalLogs = await UserModel.aggregate([{
        // _id is required. If you specify an _id value of null, or any other constant value, the $group stage calculates accumulated values for all the input documents as a whole.
        $group: { _id: null, total: { $sum: "$logs" } }
    }]);
    const totalUsers = await UserModel.find({}, { userName: 1, _id: 0 }).countDocuments();

    return totalLogs[0].total / totalUsers;
}