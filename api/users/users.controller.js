"use strict";

const User = require("./users.model");
const fs = require("fs");
const multer = require("multer");

module.exports = {
  index: (req, res) => {
    User.find({}).exec((err, userDetails) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: err });
      }
      res.status(200).json(userDetails);
    });
  },
  retrieve: (req, res) => {
    const userId = req.params.id;
    User.findOne({ _id: userId }).exec((err, userDetails) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: err });
      }
      res.status(200).json(userDetails);
    });
  },
  create: (req, res) => {
    User.create(req.body, (err, userDetails) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: err });
      }
      res.status(201).json("User Created Successfully");
    });
  },
  update: (req, res) => {
    const userId = req.params.id;
    User.findByIdAndUpdate(userId, { $set: req.body }).exec(
      (err, userDetails) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ message: "User updated" });
      }
    );
  },
  delete: (req, res) => {
    const userId = req.params.id;
    User.findByIdAndUpdate(userId, { $set: { is_active: false } }).exec(
      (err, userDetails) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ message: "User Deleted" });
      }
    );
  },
  uploadPhoto: (req, res) => {
    User.create(req.body, (err, userDetails) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: err });
      }
      var new_img = userDetails.picture;
      new_img.img.data = fs.readFileSync(req.file.path);
      new_img.img.contentType = "image/jpeg";
      new_img.save();
      res.json({ message: "New image added to the db!" });
    });
  },
  updatePhoto: (req, res) => {
    const userId = req.params.id;
    User.findByIdAndUpdate(userId, {
      $set: {
        picture: {
          data: fs.readFileSync(req.file.path),
          contentType: "image/jpeg",
        },
      },
    }).exec((err, userDetails) => {
      if (err) res.status(500).json({ message: err });
      var new_img = userDetails.picture;
      new_img.data = fs.readFileSync(req.file.path);
      new_img.contentType = "image/jpeg";

      res.json({ message: "New image added to the db!" });
    });
  },
  uploadAvatar: (req, res) => {
    const userId = req.params.id;
    User.findByIdAndUpdate(userId, {
      $set: {
        avatar: req.file.filename,
      },
    }).exec((err, userDetails) => {
      if (err) res.status(500).json({ error: 1, payload: err });
      else {
        const image = {};
        image.id = req.file.filename;
        image.url = `/uploads/${image.id}`;
        res
          .status(200)
          .json({ error: 0, payload: { id: image.id, url: image.url } });
      }
    });
  },
};
