"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const RampSchema = new Schema({
  temperature: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

const BoilSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

const FermentationAndAgeingSchema = new Schema({
  temperature: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    og: {
      type: Number,
      required: true,
    },
    fg: {
      type: Number,
      required: true,
    },
    ibu: {
      type: Number,
      required: true,
    },
    abv: {
      type: Number,
      required: true,
    },
    color: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: [IngredientSchema],
      required: true,
    },
    ramps: {
      type: [RampSchema],
      required: true,
    },
    boil: {
      type: [BoilSchema],
      required: true,
    },
    fermentation: {
      type: [FermentationAndAgeingSchema],
      required: true,
    },
    ageing: {
      type: [FermentationAndAgeingSchema],
      required: true,
    },
    carbonationMethod: {
      type: String,
      required: true,
    },
    carbonationValue: {
      type: Number,
      required: true,
    },
    carbonationUnit: {
      type: String,
      required: true,
    },
    estimatedTime: {
      type: Number,
      required: true,
    },
    annotation: {
      type: String,
      required: false,
    },
    ownerId: {
      type: String,
      required: false,
    },
    ownerName: {
      type: String,
      required: false,
    },
  },
  {
    id: true,
    toObject: {
      virtuals: true,
      getters: true,
    },
    toJSON: {
      virtuals: true,
      getters: true,
      setters: false,
    },
    timestamps: true,
  }
);

RecipeSchema.pre("find", function () {
  this.where({ is_active: { $ne: false } });
});
module.exports = mongoose.model("Recipe", RecipeSchema);
