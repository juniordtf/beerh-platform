"use strict";

const Recipe = require("./recipes.model");

module.exports = {
  index: (req, res) => {
    Recipe.find({}).exec((err, recipeDetails) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({
        message: "Recipe Details fetched Successfully",
        data: recipeDetails,
      });
    });
  },
  retrieve: (req, res) => {
    const recipeId = req.params.id;
    Recipe.findOne({ _id: recipeId }).exec((err, recipeDetails) => {
      if (err) {
        res.status(500).json({ message: err });
      }

      res.status(200).json({
        message: "Recipe Details fetched Successfully",
        data: recipeDetails,
      });
    });
  },
  create: (req, res) => {
    Recipe.create(req.body, (err, recipeDetails) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res
        .status(201)
        .json({ message: "Recipe Created Successfully", data: recipeDetails });
    });
  },
  update: (req, res) => {
    const recipeId = req.params.id;
    Recipe.findByIdAndUpdate(recipeId, { $set: req.body }).exec(
      (err, recipeDetails) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ message: "Recipe updated" });
      }
    );
  },
  delete: (req, res) => {
    const recipeId = req.params.id;
    Recipe.findByIdAndUpdate(recipeId, { $set: { is_active: false } }).exec(
      (err, recipeDetails) => {
        if (err) res.status(500).json({ message: err });

        res.status(200).json({ message: "Recipe Deleted" });
      }
    );
  },
};
