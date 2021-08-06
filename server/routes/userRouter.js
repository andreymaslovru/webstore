const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const checkedAuth = require("../middleware/checkedAuth");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", checkedAuth, userController.check);

module.exports = router;
