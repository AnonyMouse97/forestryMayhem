const router = require("express").Router();
const leaderController = require("../controllers/LeaderControllers/leader.controller");

router.get("/logs", leaderController.getMostLogs);
router.get("/trees", leaderController.getMostTrees);
router.get("/species", leaderController.getMostSpecies);

module.exports = router;