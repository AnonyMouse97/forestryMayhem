const router = require('express').Router();
const treeController = require('../controllers/tree.controller')

// tree DB
router.get('/:id', treeController.treeInfo)

module.exports = router;