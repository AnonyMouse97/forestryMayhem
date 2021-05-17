const TreeModel = require("../models/tree.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.updateValue = async (originalTree, userId, inRange) => {

    let players = [];
    let inRangeAmount = inRange.length;
    let targetValue = 0;
    let targetAmount = 0;
    let playerValue = 0;
    let ownedValue = 0;
    let allTreesValues = 0;

    inRange.forEach(tree => {
        allTreesValues += tree.value;
        if (tree.currentOwner != '') {
            players.push(tree.currentOwner);
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

    let uniquePlayers = [...new Set(players)];

    if (originalTree.currentOwner == '') {
        targetAmount = 1;
    }

    let addedValue = (targetValue * (inRangeAmount / targetAmount)) + (ownedValue - playerValue)

    for (let tree of inRange) {
        if (tree.currentOwner != '') {
            let value = Math.floor(originalTree.height * originalTree.diameter);
            let lockPrice = value * 10 + ((allTreesValues / uniquePlayers.length) - (ownedValue / uniquePlayers.length));
            await TreeModel.updateOne(
                { _id: ObjectId(tree._id) },
                { $set: { value: value + addedValue, lockPrice: lockPrice } })
        }
    }

    return;
}