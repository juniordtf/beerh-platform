"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    memberIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    inviteTokens: { type: Array, default: [] },
    creationDate: {
      type: Date,
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

GroupSchema.pre("find", function () {
  this.where({ is_active: { $ne: false } });
});
module.exports = mongoose.model("Group", GroupSchema);
