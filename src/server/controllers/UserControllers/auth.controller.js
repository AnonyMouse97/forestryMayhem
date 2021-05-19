const UserModel = require("../../models/user.model");
const TreeModel = require("../../models/tree.model");
const { getLogs } = require("../../helpers/getLogs.helper");
const { createToken } = require("../../helpers/createToken.helper")


//sign Up request
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

// sign in request
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    const time = 25 * 60 * 100;
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user.node, time);
        res.cookie('jwt', token, { httpOnly: true, time });
        res.status(200).json({ user: user._id });
    } catch (err) {
        res.status(500).json({ message: "Wrong email or password" })
    }
}


// logout request
module.exports.logout = (req, res) => {

}