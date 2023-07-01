"use strict";

const async = require("async");
const Group = require("../groups/groups.model");
const Production = require("./productions.model");

module.exports = {
  index: (req, res) => {
    Production.find({}).exec((err, productionDetails) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.status(200).json({
        message: "Production Details fetched Successfully",
        data: productionDetails,
      });
    });
  },
  retrieve: (req, res) => {
    const ProductionId = req.params.id;
    Production.findOne({ _id: ProductionId }).exec((err, productionDetails) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      res.status(200).json({
        message: "Production Details fetched Successfully",
        data: productionDetails,
      });
    });
  },
  ownProductions: (req, res) => {
    const userId = req.params.id;
    Production.find({ ownerId: userId }).exec((err, productions) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      res.status(200).json({
        message: "Productions Successfully",
        data: productions,
      });
    });
  },
  sharedProductions: (req, res) => {
    async.waterfall(
      [
        function (done) {
          const userId = req.params.id;
          Group.find({
            members: { $elemMatch: { id: userId } },
            is_active: true,
          }).exec((err, groups) => {
            if (groups) {
              done(err, groups);
            } else {
              done("Groups not found");
            }
          });
        },
        function (groups, done) {
          const groupsIds = groups.map((x) => x.id);

          Production.find({ ownerId: { $in: groupsIds } }).exec(
            (err, productions) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ message: err });
              }

              return res.status(200).json({
                message: "Productions fetched Successfully",
                data: productions,
              });
            }
          );
        },
      ],
      function (err) {
        console.log(err);
        return res.status(422).json({ message: err });
      }
    );
  },
  create: (req, res) => {
    Production.create(req.body, (err, productionDetails) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err });
      }
      return res.status(201).json({
        message: "Production Created Successfully",
        data: productionDetails,
      });
    });
  },
  update: (req, res) => {
    const ProductionId = req.params.id;
    Production.findByIdAndUpdate(ProductionId, { $set: req.body }).exec(
      (err, productionDetails) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ message: "Production updated" });
      }
    );
  },
  delete: (req, res) => {
    const ProductionId = req.params.id;
    Production.findByIdAndUpdate(ProductionId, {
      $set: { is_active: false },
    }).exec((err, productionDetails) => {
      if (err) res.status(500).json({ message: err });

      res.status(200).json({ message: "Production Deleted" });
    });
  },
};
