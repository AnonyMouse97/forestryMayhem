const TreeModel = require("../models/tree.model");


module.exports.getInRange = (treeId) => {


    TreeModel.findById(treeId, (err, data) => {
        if (!err) {
            test(data)
        } else {
            console.log(`Error : ${err}`);
        }
    });


    //get trees
    // 1° = 111km => 100m = 0,9009°  lat: 50.627697, lon: 5.60454, id : 609541a2212e8518f09ab8ec

    let x = 50.627697;
    let y = 5.60454;
    const deg = 0.90009;

    () => {
        TreeModel.find({
            $and: [
                {
                    "location.lat": { $gt: x - deg },
                    "location.lat": { $lt: x + deg },
                    "location.lon": { $gt: y - deg },
                    "location.lon": { $lt: y + deg }
                }
            ]
        })
    }

    const test = (data) => {
        console.log(data);
    }
}