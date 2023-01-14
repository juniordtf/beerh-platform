"use strict";

const express = require("express");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/uploads/");
  },
});
const upload = multer({ storage: storage });
//const upload = multer({ dest: "public/uploads/" });

const controller = require("./users.controller");
const router = express.Router();
const VerifyToken = require("../auths/verifyToken");

router.get("/", VerifyToken, controller.index);
router.get("/:id", VerifyToken, controller.retrieve);
router.post("/", controller.create);
router.put("/:id", VerifyToken, controller.update);
router.delete("/:id", VerifyToken, controller.delete);
router.put(
  "/avatar/:id",
  VerifyToken,
  upload.single("file"),
  controller.uploadAvatar
);

module.exports = router;
