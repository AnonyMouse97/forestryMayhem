const UserModel = require("../../models/user.model");

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
            }
        },
        {
            $group:
            {
                _id: null,
                trees: { $addToSet: "$treeDetail" },
            }
        }
    ])

    let singledOutTreesOfUsers = []

    userTrees[0].trees.forEach((user) => {
        let arrayTree = []
        user.forEach((tree) => {
            arrayTree.push(tree.treeSpecies)
        })

        let sortedTrees = { array: [... new Set(arrayTree)], userId: user[0]._id }
        singledOutTreesOfUsers.push(sortedTrees)
    })

    function compare(a, b) {
        if (a.array.length < b.array.length) {
            return 1
        }
        if (a.array.length > b.array.length) {
            return -1
        }
        return 0
    }

    let sortedResult = singledOutTreesOfUsers.sort(compare)

    res.status(200).json(sortedResult);
}
