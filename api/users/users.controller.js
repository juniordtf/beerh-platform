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
        return res.status(500).json({ message: err });
      }
      res.status(200).json(userDetails);
    });
  },
  create: (req, res) => {
    User.create(req.body, (err, userDetails) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err });
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
  uploadAvatar: async (req, res) => {
    const userId = req.params.id;
    const formData = await req.body;
    var userJSON = await JSON.parse(formData.file);
    console.log(userJSON);

    const avatar = await Buffer.from(userJSON.uri, "utf-8");

    //delete userJSON.avatar
    //userJSON.avatar=avatar
    console.log(avatar);

    User.findByIdAndUpdate(userId, {
      $set: {
        avatar: avatar,
      },
    }).exec((err, userDetails) => {
      if (err) return res.status(500).json({ error: 1, payload: err });
      else {
        const image = {};
        image.id = userJSON.name;
        image.url = `uploads/${userId}`;
        console.log(image);
        res
          .status(200)
          .json({ error: 0, payload: { id: image.id, url: image.url } });
      }
    });
  },
};
