const TreeModel = require("../../models/tree.model");
const UserModel = require("../../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const { getInRange } = require("../../helpers/getInRange.helper");
const { getValue } = require("../../helpers/getValue.helper");

// find one tree in particular using his ID
module.exports.treeInfo = (req, res) => {
    // params = parameters in url, body = parameters in forms
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`ID unknown: ${req.params.id}`);
    }
    TreeModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(`ID unknown: ${err}`);
        }
    }).select();
};

module.exports.buyTree = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.newOwnerId)) {
        return res.status(400).send(`ID unknown: ${req.params.id}`);
    }

    // get original tree
    const originalTree = await TreeModel.findOne(
        { "_id": ObjectId(req.params.id) }
    )
    // get new Owner
    const newOwner = await UserModel.findOne(
        { "_id": ObjectId(req.body.newOwnerId) }
    )

    if (originalTree.lock) {
        if (newOwner.logs >= originalTree.value) {
            // remove leaves to user
            // update currentOwner
            if (!originalTree.currentOwner) {
                // add pastOwner
                // remove tree to previous owner's trees
                // update values
                // add history (Buy + Lost)
            }
        } else {
            res.status(500).send(`Owner #${req.body.newOwnerId} has not enough logs.`)
        }
    } else {
        res.status(500).send(`Tree #${req.params.id} is locked.`)
    }






    const inRange = await getInRange(originalTree);
    const value = await getValue(originalTree, newOwner, inRange);
    console.log(value)

    res.status(200).send("bought");
};
