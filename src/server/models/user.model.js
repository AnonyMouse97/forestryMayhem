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
            minLength: 3,
        },
        password: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail],
            trim: true,
        },
        color: { type: String },
        profilePic: { type: String },
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

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
