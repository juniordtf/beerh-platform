var express = require("express");
var jwt = require("jsonwebtoken");
var config = require("../../config/environment");
var VerifyToken = express.Router();

VerifyToken.use(function (req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({ auth: false, message: "No Token" });
  }

  jwt.verify(token, process.env.session, function (err, decoded) {
    console.log(token);
    console.log(process.env.session);
    if (err) {
      console.log(err);
      return res
        .status(401)
        .json({ auth: false, message: "Not An Authorized User" });
    }

    req.body.user_id = decoded.user_id;
    req.body.email = decoded.email;
    next();
  });
});

module.exports = VerifyToken;
