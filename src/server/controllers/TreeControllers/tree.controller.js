const TreeModel = require("../../models/tree.model");
const UserModel = require("../../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const { getInRange } = require("../../helpers/getInRange.helper");
const { updateValue } = require("../../helpers/updateValue.helper");

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

    if (!originalTree.lock) {
        if (newOwner.logs >= originalTree.value) {
            // remove leaves to user and add tree in trees
            await UserModel.updateOne(
                { _id: ObjectId(req.body.newOwnerId) },
                {
                    $inc: { logs: - originalTree.value },
                    $addToSet: { trees: ObjectId(req.params.id) }
                });
            // update currentOwner
            await TreeModel.updateOne(
                { _id: ObjectId(req.params.id) },
                {
                    $set: { currentOwner: req.body.newOwnerId }
                }
            )

            if (!originalTree.currentOwner) {
                // add pastOwner
                await TreeModel.updateOne(
                    { _id: ObjectId(req.params.id) },
                    {
                        $addToSet: { pastOwners: originalTree.currentOwner }
                    }
                )
                // remove tree to previous owner's trees
                await UserModel.updateOne(
                    { _id: ObjectId(originalTree.currentOwner) },
                    {
                        $pull: { trees: req.params.id }
                    })

                // update values
                const inRange = await getInRange(originalTree);
                await updateValue(originalTree, newOwner, inRange);


                // add history (Buy + Lost)

            }
        } else {
            res.status(500).send(`Owner #${req.body.newOwnerId} has not enough logs.`)
        }
    } else {
        res.status(500).send(`Tree #${req.params.id} is locked.`)
    }

    res.status(200).send("bought");
};
