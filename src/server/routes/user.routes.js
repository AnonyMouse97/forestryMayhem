const router = require("express").Router();
const authController = require("../controllers/UserControllers/auth.controller");
const userController = require("../controllers/UserControllers/user.controller");

// authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("logout", authController.logout)

// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser)

module.exports = router;