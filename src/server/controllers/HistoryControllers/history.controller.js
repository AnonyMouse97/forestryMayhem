const HistoryModel = require("../../models/history.model");

module.exports.getHistory = async (req, res) => {
    try {
        const history = await HistoryModel.find()
        res.status(200).json(history)
    } catch (err) {
        res.status(500).json(err)
    }
};
