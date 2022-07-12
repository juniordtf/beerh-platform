"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: false,
    },
    volume: {
      type: Number,
      required: true,
    },
    realVolume: {
      type: Number,
      required: true,
    },
    og: {
      type: Number,
      required: true,
    },
    realOg: {
      type: Number,
      required: true,
    },
    fg: {
      type: Number,
      required: true,
    },
    realFg: {
      type: Number,
      required: true,
    },
    abv: {
      type: Number,
      required: true,
    },
    realAbv: {
      type: Number,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    estimatedTime: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    brewDate: {
      type: String,
      required: true,
    },
    fermentationDate: {
      type: String,
      required: true,
    },
    carbonationDate: {
      type: String,
      required: true,
    },
    ageingDate: {
      type: String,
      required: true,
    },
    fillingDate: {
      type: String,
      required: true,
    },
    initialCalendarDate: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: false,
    },
    createdAt: {
      type: String,
      required: true,
    },
    lastUpdateDate: {
      type: String,
      required: true,
    },
    viewToRestore: {
      type: String,
      required: false,
    },
    ownerId: {
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

ProductionSchema.pre("find", function () {
  this.where({ is_active: { $ne: false } });
});
module.exports = mongoose.model("Production", ProductionSchema);
