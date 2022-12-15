"use strict";

require("dotenv").config();
const Group = require("./groups.model");
const User = require("../users/users.model");
const nodemailer = require("nodemailer");
const async = require("async");
const crypto = require("crypto");
var hbs = require("nodemailer-express-handlebars");

var smtpTransport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: process.env.MAILER_EMAIL_ID,
    pass: process.env.MAILER_PASSWORD,
  },
});

var options = {
  viewEngine: {
    extname: ".html",
    layoutsDir: "api/templates/",
    defaultLayout: false,
    partialsDir: "api/templates/",
  },
  viewPath: "api/templates/",
};

smtpTransport.use("compile", hbs(options));

module.exports = {
  index: (req, res) => {
    Group.find({}).exec((err, GroupDetails) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({
        message: "Group Details fetched Successfully",
        data: GroupDetails,
      });
    });
  },
  retrieve: (req, res) => {
    const GroupId = req.params.id;
    Group.findOne({ _id: GroupId }).exec((err, GroupDetails) => {
      if (err) {
        res.status(500).json({ message: err });
      }

      res.status(200).json({
        message: "Group Details fetched Successfully",
        data: GroupDetails,
      });
    });
  },
  create: (req, res) => {
    Group.create(req.body, (err, GroupDetails) => {
      if (err) {
        console.log(req.body);
        console.log(err);
        return res.status(500).json({ message: err });
      }
      return res
        .status(201)
        .json({ message: "Group Created Successfully", data: GroupDetails });
    });
  },
  update: (req, res) => {
    const GroupId = req.params.id;
    Group.findByIdAndUpdate(GroupId, { $set: req.body }).exec(
      (err, GroupDetails) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ message: "Group updated" });
      }
    );
  },
  delete: (req, res) => {
    const GroupId = req.params.id;
    Group.findByIdAndUpdate(GroupId, { $set: { is_active: false } }).exec(
      (err, GroupDetails) => {
        if (err) res.status(500).json({ message: err });

        res.status(200).json({ message: "Group Deleted" });
      }
    );
  },
  send_invitation: function (req, res) {
    async.waterfall(
      [
        function (done) {
          User.findOne({
            email: req.body.email,
          }).exec(function (err, user) {
            if (user) {
              done(err, user);
            } else {
              done("User not found.");
            }
          });
        },
        function (user, done) {
          // create the random token
          crypto.randomBytes(20, function (err, buffer) {
            var token = buffer.slice(0, 4).toString("hex");
            done(err, user, token);
          });
        },

        function (user, token, done) {
          Group.findOneAndUpdate(
            { _id: req.body.groupId },
            {
              $push: {
                inviteTokens: token.toString(),
              },
            },
            { new: true, useFindAndModify: false }
          ).exec(function (err, group) {
            done(err, user, token, group);
          });
        },
        function (user, token, group, done) {
          var data = {
            from: process.env.MAILER_EMAIL_ID,
            to: "juniordtf@gmail.com",
            subject: `Convite para participar do grupo ${group.name}`,
            template: "invite-group-member",
            context: {
              userName: user.name,
              groupName: group.name,
              token: token,
            },
          };

          smtpTransport.sendMail(data, function (err) {
            if (!err) {
              return res.json({
                message: "Kindly check your email for further instructions",
                email: user.email,
                token: token,
              });
            } else {
              console.log(err);
              res.status(500).json({ message: err });
            }
          });
        },
      ],
      function (err) {
        console.log(err);
        return res.status(422).json({ message: err });
      }
    );
  },
};
