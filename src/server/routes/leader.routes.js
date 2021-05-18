const router = require("express").Router();
const leaderController = require("../controllers/LeaderControllers/leader.controller");
const testController = require("../helpers/updateLogs.helper")

router.get("/logs", leaderController.getMostLogs);
router.get("/trees", leaderController.getMostTrees);
router.get("/species", leaderController.getMostSpecies);
router.get("/test", testController.addLogs)

module.exports = router;