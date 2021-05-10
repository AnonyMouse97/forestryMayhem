const UserModel = require('../models/user.model');
const TreeModel = require('../models/tree.model');

module.exports.signUp = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        // search ownerless trees
        // const trees = await TreeModel.find({ currentOwner: "" }).limit(3)
        const trees = await TreeModel.aggregate([{ $match: { currentOwner: "" } }, { $sample: { size: 3 } }])
        const [firstTree, secondTree, thirdTree] = trees
        const freeTrees = new Array(firstTree._id, secondTree._id, thirdTree._id)

        // create the user
        const user = await UserModel.create({ username, password, email, trees: freeTrees });

        // add new owner to free trees
        for (let tree of trees) {
            const userObject = {
                currentOwner: user._id,
                pastOwners: [user._id]
            }
            const res = await TreeModel.updateOne({ _id: tree._id }, { $set: userObject })
            console.log(res)
        }

        res.status(201).json({ user: user._id });
    } catch (err) {
        console.log(err);
        res.status(200).send({ err });
    }
}