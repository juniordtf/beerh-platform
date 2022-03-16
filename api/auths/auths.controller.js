"use strict";

require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../users/users.model");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const async = require("async");
const crypto = require("crypto");

var hbs = require("nodemailer-express-handlebars");

var smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER,
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
  login: (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
      console.log(user);
      if (err || user == null) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }
      var isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ auth: false, token: null, message: "Not Authorised User" });
      } else {
        let payload = {
          user_id: user._id,
          email: user.email,
        };
        let token = jwt.sign(payload, process.env.session, {
          expiresIn: process.env.expiresIn,
        });
        return res.status(200).json({
          auth: true,
          token: token,
          name: user.name,
          _id: user._id,
          avatar: user.avatar,
          message: "User Logged In Successfully",
        });
      }
    });
  },

  forgot_password: function (req, res) {
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
          User.findOneAndUpdate(
            { _id: user._id },
            {
              reset_password_token: token,
              reset_password_expires: Date.now() + 86400000,
            },
            { new: true, useFindAndModify: false }
          ).exec(function (err, new_user) {
            done(err, token, new_user);
          });
        },
        function (token, user, done) {
          var data = {
            from: process.env.MAILER_EMAIL_ID,
            to: "juniordtf@gmail.com",
            subject: "Solicitação de troca de senha",
            template: "forgot-password-email",
            context: {
              token: token,
              name: user.name,
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
              return done(err);
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

  reset_password: function (req, res, next) {
    User.findOne({
      email: req.body.email,
      reset_password_token: req.body.token,
      reset_password_expires: {
        $gt: Date.now(),
      },
    }).exec(function (err, user) {
      if (!err && user) {
        if (req.body.newPassword === req.body.verifyPassword) {
          user.password = bcrypt.hashSync(req.body.newPassword, 10);
          user.reset_password_token = undefined;
          user.reset_password_expires = undefined;
          user.save(function (err) {
            if (err) {
              return res.status(422).send({
                message: err,
              });
            } else {
              var data = {
                from: process.env.MAILER_EMAIL_ID,
                to: "juniordtf@gmail.com",
                subject: "Confirmação de troca de senha",
                template: "reset-password-email",
                context: {
                  name: user.name,
                },
              };

              smtpTransport.sendMail(data, function (err) {
                if (!err) {
                  return res.json({ message: "Password reset" });
                } else {
                  return done(err);
                }
              });
            }
          });
        } else {
          return res.status(422).send({
            message: "Passwords do not match",
          });
        }
      } else {
        return res.status(400).send({
          message: "Password reset token is invalid or has expired.",
        });
      }
    });
  },
};
