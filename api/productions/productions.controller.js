"use strict";

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
