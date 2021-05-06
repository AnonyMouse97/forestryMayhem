const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minLength: 3 },
    password: { type: String, required: true }
}, {
    timestamps: true,
});


// salting password before saving into database
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;