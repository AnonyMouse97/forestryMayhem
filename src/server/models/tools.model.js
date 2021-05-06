const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const axeSchema = new Schema({
    userName: { type: String, required: true },
    axeName: { type: String, required: true },
    description: { type: String, required: true },
    serialNumber: { type: Number, required: true }
}, {
    timestamps: true,
});




const Timber = mongoose.model('Tim-Bers', axeSchema);

module.exports = Timber;