const router = require("express").Router();
const treeController = require("../controllers/TreeControllers/tree.controller");

// tree DB
router.get("/", treeController.getTrees)
router.get("/:id", treeController.treeInfo);
router.get("/logs/:id", treeController.getLogsByMinutes)
router.put("/buy/:id", treeController.buyTree);
router.put("/lock/:id", treeController.lockTree);
router.patch("/comment/:id", treeController.addComment)

module.exports = router;
