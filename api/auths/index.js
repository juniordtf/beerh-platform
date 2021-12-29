"use strict";

const express = require("express");
const controller = require("./auths.controller");
const router = express.Router();

router.post("/", controller.login);
router.post("/forgot_password", controller.forgot_password);
router.post("/reset_password", controller.reset_password);

module.exports = router;
