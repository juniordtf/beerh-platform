"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
      type: Date,
      required: true,
    },
    fermentationDate: {
      type: Date,
      required: true,
    },
    carbonationDate: {
      type: Date,
      required: true,
    },
    ageingDate: {
      type: Date,
      required: true,
    },
    fillingDate: {
      type: Date,
      required: true,
    },
    initialCalendarDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    lastUpdateDate: {
      type: Date,
      required: true,
    },
    ownerId: {
      type: String,
      required: false,
    },
    viewToRestore: {
      type: String,
      required: true,
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
