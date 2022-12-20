"use strict";

const express = require("express");
const controller = require("./groups.controller");
const router = express.Router();
const VerifyToken = require("../auths/verifyToken");

router.get("/", VerifyToken, controller.index);
router.get("/:id", VerifyToken, controller.retrieve);
router.get("/allowedGroups/:id", VerifyToken, controller.getAllowedGroups);
router.post("/", VerifyToken, controller.create);
router.put("/:id", VerifyToken, controller.update);
router.delete("/:id", VerifyToken, controller.delete);
router.post("/send_invitation", controller.send_invitation);
router.post("/add_member", controller.add_member);

module.exports = router;
