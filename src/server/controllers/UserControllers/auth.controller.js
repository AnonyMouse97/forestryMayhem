const UserModel = require("../../models/user.model");
const TreeModel = require("../../models/tree.model");
const { getLogs } = require("../../helpers/getLogs.helper");

module.exports.signUp = async (req, res) => {
    const { userName, password, email, color, profilePic } = req.body;
    try {
        // search ownerless trees
        const trees = await TreeModel.aggregate([
            { $match: { currentOwner: "" } },
            { $sample: { size: 3 } },
        ]);
        const [firstTree, secondTree, thirdTree] = trees;
        const freeTrees = new Array(
            firstTree._id,
            secondTree._id,
            thirdTree._id,
        );

        //request to getLogs
        const freeLogs = Math.floor(await getLogs());

        // [#fc5c65, #fd9644, #fed330, #26de81, #2bcbba, #45aaf2, #4b7bec, #a55eea]
        //const randPic = `./src/public/img/profilePics/default/default${Math.floor(Math.random() * 6)}.png`;

        // create the user
        const user = await UserModel.create({
            userName,
            password,
            email,
            profilePic,
            color,
            logs: freeLogs,
            trees: freeTrees,
        });

        // add new owner to free trees
        for (const tree of trees) {
            const newUser = {
                currentOwner: user._id,
                pastOwners: [user._id],
            };
            const res = await TreeModel.updateOne(
                { _id: tree._id },
                { $set: newUser },
            );
            console.log(res)
        }

        res.status(201).json({ user: user._id });
    } catch (err) {
        console.log(err);
        res.status(200).send({ err });
    }
};
