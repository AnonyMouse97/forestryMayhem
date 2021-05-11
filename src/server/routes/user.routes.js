const router = require("express").Router();
const authController = require("../controllers/UserControllers/auth.controller");
const userController = require("../controllers/UserControllers/user.controller");

// authentification
router.post("/register", authController.signUp);

// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);

module.exports = router;