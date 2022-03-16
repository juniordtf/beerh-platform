"use strict";

const Group = require("./groups.model");

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
};
