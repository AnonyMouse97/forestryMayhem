const router = require("express").Router();
const historyController = require("../controllers/HistoryControllers/history.controller");

router.get("/", historyController.getHistory);

module.exports = router;