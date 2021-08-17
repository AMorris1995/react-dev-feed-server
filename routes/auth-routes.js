const express = require("express");
const router = express.Router();

const auth_controllers = require("../controllers/auth-controllers");
router.post("/post-register", auth_controllers.postRegister);
router.post("/post-sign-in", auth_controllers.postSignIn);

module.exports = router;
