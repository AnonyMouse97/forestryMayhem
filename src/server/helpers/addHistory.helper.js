const HistoryModel = require("../models/history.model");

module.exports.addHistory = async (action, treeId, userId) => {
    const newHistory = {
        action: action,
        treeId: treeId,
        userId: userId
    }

    HistoryModel.create(newHistory)
}