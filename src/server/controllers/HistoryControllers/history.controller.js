const HistoryModel = require("../../models/history.model");

module.exports.getHistory = async (req, res) => {
    const history = await HistoryModel.find()
    res.status(200).json(history)

};
