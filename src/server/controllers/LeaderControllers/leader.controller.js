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

function findNameOfTree(id) {
    const species = TreeModel.findById(id)
    return species
}

module.exports.getMostSpecies = async (req, res) => {
    const speciesName = await UserModel.aggregate([
        {
            $lookup:
            {
                from: "trees",
                localField: "trees",
                foreignField: "treeSpecies",
                as: "test"
            }
        }
    ])
    // const numberOfSpecies = await UserModel.find({}).sort({ trees: -1 }).limit(5)
    res.status(200).json(speciesName)
}
