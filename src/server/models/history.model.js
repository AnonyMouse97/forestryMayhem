const mongoose = require("mongoose")

const historySchema = new mongoose.Schema(
    {
        action: { type: String, required: true, trim: true },
        treeId: { type: String, required: true, trim: true },
        userId: { type: String, required: true, trim: true }
    },
    {
        timestamps: true
    }
)

const HistoryModel = mongoose.model("history", historySchema)

module.exports = HistoryModel