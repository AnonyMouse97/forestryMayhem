const TreeModel = require("../../models/tree.model");
const ObjectId = require("mongoose").Types.ObjectId;
const { getInRange } = require("../../helpers/getInRange.helper");

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

module.exports.buyTree = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`ID unknown: ${req.params.id}`);
    }


    await getInRange(req.params.id)

    res.status(200).send("bought");
};
