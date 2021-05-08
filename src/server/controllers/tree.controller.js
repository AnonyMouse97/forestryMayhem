const TreeModel = require('../models/tree.model')
const ObjectId = require('mongoose').Types.ObjectId

// find one tree in particular using his ID
module.exports.treeInfo = (req, res) => {
    // params = parameters in url, body = parameters in forms
    console.log(req.params)
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`ID unknown: ${req.params.id}`)
    }
    TreeModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log(`ID unknown: ${err}`)
        }
    }).select()
}
