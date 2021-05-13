const TreeModel = require("../../models/tree.model");
const ObjectId = require("mongoose").Types.ObjectId;

// find one tree in particular using his ID
module.exports.treeInfo = (req, res) => {
    // params = parameters in url, body = parameters in forms
    console.log(req.params);
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

module.exports.addComment = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`ID unknown: ${req.params.id}`);
    }
    try {
        await TreeModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { comments: { Author: req.body.author, Message: req.body.message } } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs)
                else return res.status(400).json(err)
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}