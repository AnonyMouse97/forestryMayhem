const TreeModel = require("../models/tree.model");
const ObjectId = require("mongoose").Types.ObjectId;


module.exports.getInRange = async (originalTree) => {

    // get lat and lon from original tree
    let lat = originalTree.location.lat;
    let lon = originalTree.location.lon;
    // 1° = 111km => 100m = 0,009009° conversion
    const deg = 0.00090009;

    // get trees
    const treesInSquare = await TreeModel.find({
        "location.lat": {
            $gt: lat - deg, $lt: lat + deg
        }, "location.lon": {
            $gt: lon - deg, $lt: lon + deg
        }
    })

    let treesInRadius = [];

    let pythRadius = Math.pow(deg, 2);

    treesInSquare.forEach(tree => {

        let x = Math.abs(tree.location.lat - lat);
        let y = Math.abs(tree.location.lon - lon);

        if (Math.pow(x, 2) + Math.pow(y, 2) <= pythRadius) {
            treesInRadius.push(tree);
        }
    });

    return treesInRadius;
}