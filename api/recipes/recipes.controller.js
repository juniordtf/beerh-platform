"use strict";

const async = require("async");
const Recipe = require("./recipes.model");
const Group = require("../groups/groups.model");

module.exports = {
  index: (req, res) => {
    Recipe.find({}).exec((err, recipeDetails) => {
      if (err) {
        return res.status(500).json({ message: err });
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
        return res.status(500).json({ message: err });
      }

      return res.status(200).json({
        message: "Recipe Details fetched Successfully",
        data: recipeDetails,
      });
    });
  },
  ownRecipes: (req, res) => {
    const userId = req.params.id;
    Recipe.find({ ownerId: userId }).exec((err, recipes) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      res.status(200).json({
        message: "Recipes fetched Successfully",
        data: recipes,
      });
    });
  },
  sharedRecipes: (req, res) => {
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

          Recipe.find({ ownerId: { $in: groupsIds } }).exec((err, recipes) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ message: err });
            }

            return res.status(200).json({
              message: "Groups Recipes fetched Successfully",
              data: recipes,
            });
          });
        },
      ],
      function (err) {
        console.log(err);
        return res.status(422).json({ message: err });
      }
    );
  },
  create: (req, res) => {
    Recipe.create(req.body, (err, recipeDetails) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err });
      }
      return res
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
