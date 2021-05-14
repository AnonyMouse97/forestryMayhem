const router = require("express").Router();
const treeController = require("../controllers/TreeControllers/tree.controller");

// tree DB
router.get("/:id", treeController.treeInfo);
router.put("/buy/:id", treeController.buyTree);

module.exports = router;
