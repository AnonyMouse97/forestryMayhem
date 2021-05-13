const router = require("express").Router();
const treeController = require("../controllers/TreeControllers/tree.controller");

// tree DB
router.get("/:id", treeController.treeInfo);
router.patch("/comment/:id", treeController.addComment)

module.exports = router;
