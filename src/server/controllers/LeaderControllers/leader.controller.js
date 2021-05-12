const UserModel = require("../../models/user.model");
const TreeModel = require("../../models/tree.model");

module.exports.getMostLogs = async (req, res) => {
    const mostLogs = await UserModel.find({}).sort({ logs: -1 }).limit(5)
    res.status(200).json(mostLogs);
}

module.exports.getMostTrees = async (req, res) => {
    const mostTrees = await UserModel.find({}).sort({ trees: -1 }).limit(5)
    res.status(200).json(mostTrees);
}

module.exports.getMostSpecies = async (req, res) => {
    const userTrees = await UserModel.aggregate([
        {
            $lookup:
            {
                from: "trees",
                localField: "trees",
                foreignField: "_id",
                as: "treeDetail"
            },

        }
    ])

    res.status(200).json(x);
}
