const TreeModel = require("../../models/tree.model");
const UserModel = require("../../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const { getInRange } = require("../../helpers/getInRange.helper");
const { updateValue } = require("../../helpers/updateValue.helper");

// get all trees
module.exports.getTrees = async (req, res) => {
    try {
        const trees = await TreeModel.find({}, { location: 1 });
        res.status(200).json(trees);
    } catch (err) {
        res.status(500).json({ message: `Could not find. Error : ${err}` });
    }
}


// find one tree in particular using his ID
module.exports.treeInfo = (req, res) => {
    // params = parameters in url, body = parameters in forms
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json(`ID unknown: ${req.params.id}`);
    }
    TreeModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.json(data);
        } else {
            res.status(400).json({ message: `ID unknown: ${err}` });
        }
    }).select();
};


/* Put - Buy
 *
 *  Expecting :
 *  tree id IN url AS /:id
 *  user id IN body AS newOwnerId
 *
 */
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

    if (!originalTree.locked) {
        if (originalTree.currentOwner != req.body.newOwnerId) {
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
                // update values
                const inRange = await getInRange(originalTree);
                await updateValue(originalTree, newOwner, inRange);

                if (originalTree.currentOwner != '') {
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

                    // add history (Buy + Lost)

                }

                res.status(200).json({ message: `Tree #${req.params.id} has been purchased.` });
            } else {
                res.status(500).json({ message: `User #${req.body.newOwnerId} has not enough logs.` })
            }
        } else {
            res.status(500).json({ message: `User #${req.body.newOwnerId} already owns the tree.` })
        }
    } else {
        res.status(500).json({ message: `Tree #${req.params.id} is locked.` })
    }

};


/* Put - Lock
 *
 *  Expecting :
 *  tree id IN url AS /:id
 *  user id IN body AS ownerId
 *
 */
module.exports.lockTree = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.ownerId)) {
        return res.status(400).json({ message: `ID unknown: ${req.params.id}` });
    }

    // get original tree
    const tree = await TreeModel.findOne(
        { "_id": ObjectId(req.params.id) }
    )
    // get new Owner
    const owner = await UserModel.findOne(
        { "_id": ObjectId(req.body.ownerId) }
    )

    if (!tree.locked) {
        if (tree.currentOwner == req.body.ownerId) {
            if (owner.logs >= tree.lockPrice) {
                await TreeModel.updateOne(
                    { _id: ObjectId(req.params.id) },
                    {
                        $set: { locked: true }
                    });

                await UserModel.updateOne(
                    { _id: ObjectId(req.body.ownerId) },
                    {
                        $inc: { logs: - tree.lockPrice }
                    });

                res.status(200).json({ message: 'Tree locked ! 🔒' })

            } else {
                res.status(500).json({ message: `Not enough logs...` });
            }
        } else {
            res.status(500).json({ message: `You are not the owner of tree #${req.params.id}.` });
        }
    } else {
        res.status(500).json({ message: `Tree #${req.params.id} is already locked.` });
    }
}