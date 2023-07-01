"use strict";

const express = require("express");
const controller = require("./productions.controller");
const router = express.Router();
const VerifyToken = require("../auths/verifyToken");

router.get("/", VerifyToken, controller.index);
router.get("/:id", VerifyToken, controller.retrieve);
router.get("/ownProductions/:id", VerifyToken, controller.ownProductions);
router.get("/sharedProductions/:id", VerifyToken, controller.sharedProductions);
router.post("/", VerifyToken, controller.create);
router.put("/:id", VerifyToken, controller.update);
router.delete("/:id", VerifyToken, controller.delete);

module.exports = router;
