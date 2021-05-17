const mongoose = require("mongoose");

const treeSchema = new mongoose.Schema(
    {
        treeName: { type: String, required: true, trim: true },
        treeSpecies: { type: String, required: true, trim: true },
        wikiLink: { type: String, required: true, trim: true },
        location: { lat: Number, lon: Number },
        value: { type: Number, required: true, trim: true },
        diameter: { type: Number, required: true, trim: true },
        height: { type: Number, required: true, trim: true },
        locked: { type: Boolean, required: true },
        lockPrice: { type: Number },
        currentOwner: { type: String, required: true, trim: true },
        pastOwners: { type: Array },
        comments: { type: Array },
    },
    {
        timestamps: true,
    },
);

const TreeModel = mongoose.model("trees", treeSchema);

module.exports = TreeModel;
