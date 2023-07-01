"use strict";

const express = require("express");
const controller = require("./groups.controller");
const router = express.Router();
const VerifyToken = require("../auths/verifyToken");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/uploads/");
  },
});
const upload = multer({ storage: storage });

router.get("/", VerifyToken, controller.index);
router.get("/:id", VerifyToken, controller.retrieve);
router.get("/allowedGroups/:id", VerifyToken, controller.getAllowedGroups);
router.post("/", VerifyToken, controller.create);
router.put("/:id", VerifyToken, controller.update);
router.delete("/:id", VerifyToken, controller.delete);
router.post("/send_invitation", controller.send_invitation);
router.post("/add_member", controller.add_member);
router.put(
  "/avatar/:id",
  VerifyToken,
  upload.single("file"),
  controller.uploadAvatar
);

module.exports = router;
