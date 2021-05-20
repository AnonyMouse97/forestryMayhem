const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail],
            trim: true,
        },
        color: { type: String, required: true },
        profilePic: { type: String, required: true },
        logs: { type: Number },
        trees: { type: Array },
    },
    {
        timestamps: true,
    },
);

// salting password before saving into database
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    try {
        const user = await this.findOne({ email });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw Error('incorect password');
        }
        throw Error('incorect email')
    } catch (err) {
        console.log(err)
    }
}




const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
