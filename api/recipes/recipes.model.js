"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
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
  id: {
    type: Number,
    required: true,
  },
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
  id: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: Number,
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

const RecipeSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    volume: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    og: {
      type: String,
      required: true,
    },
    fg: {
      type: String,
      required: true,
    },
    ibu: {
      type: String,
      required: true,
    },
    abv: {
      type: String,
      required: true,
    },
    color: {
      type: String,
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
      type: String,
      required: true,
    },
    ageing: {
      type: String,
      required: true,
    },
    carbonationMethod: {
      type: String,
      required: true,
    },
    carbonationValue: {
      type: String,
      required: true,
    },
    carbonationUnit: {
      type: String,
      required: true,
    },
    estimatedTime: {
      type: String,
      required: true,
    },
    annotation: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    lastUpdateDate: {
      type: String,
      required: true,
    },
  },
  {
    id: false,
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
