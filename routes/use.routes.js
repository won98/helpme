const express = require("express");
const router = express.Router();

const { userController: controller } = require("../controller");
// const { isAuth } = require("../middleware/isAuth");
// const { isRefresh } = require("../middleware/isRefresh");

//router.post("/join", controller.Join);

router.post("/join", controller.Join);
router.post("/login", controller.Login);
// router.post("/auth", isAuth, controller.AuthTest);
// router.post("/refresh", isRefresh);

module.exports = router;
