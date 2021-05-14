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
            if (tree.owner == userId) {
                playerValue += tree.value;
            }
            if (tree.currentOwner == originalTree.currentOwner) {
                targetValue += tree.value;
                targetAmount++;
            }
            else {
                ownedValue += tree.value;
            }


        }
    });

    let newValue = (targetValue * (inRangeAmount / targetAmount)) + (ownedValue - playerValue)

    inRange.forEach(tree => {
        try {
            await TreeModel.updateOne(
                { _id: ObjectId(tree._id) },
                { $inc: { value: newValue } })
        } catch (err) {
            resizeBy.status(400).send(`Could not update values : ${err}`)
        }
    });
}