const TreeModel = require("../models/tree.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getValue = async (originalTree, userId, inRange) => {

    console.log(userId)


    const treeAmount = inRange.length;
    // sort trees with owners/no owners


    let inRangeAmount = inRange.length;
    let targetValue = 0;
    let targetAmount = 0;
    let playerValue = 0;
    let ownedValue = 0;


    // remove! after testings
    inRange.forEach(tree => {
        if (!tree.currentOwner) {
            const originalValue = tree.value;
            if (tree.owner == userId) {
                playerValue += tree.value;
            }
            if (tree.owner = tree.currentOwner) {

            }
            else {
                ownedValue += tree.value;
            }

        }
    });

    return originalTree;
}