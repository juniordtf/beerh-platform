"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DEFAULTPASSWORD = "beerhadmin";
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    surname: {
      type: String,
      required: false,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    address: {
      lines: {
        type: [String],
        required: false,
      },
      postal: {
        type: String,
        required: false,
      },
    },
    mobile: {
      type: String,
      required: false,
    },
    picture: {
      data: Buffer,
      contentType: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    token: {
      type: String,
      required: false,
    },
    reset_password_token: {
      type: String,
    },
    reset_password_expires: {
      type: Date,
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

UserSchema.pre("find", function () {
  this.where({ is_active: { $ne: false } });
});

var validatePresenceOf = function (value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */

UserSchema.pre("save", function (next) {
  if (!this.isNew) return next();
  if (!validatePresenceOf(this.password)) {
    next();
  } else {
    this.newPassword = this.password || DEFAULTPASSWORD;
    this.password = bcrypt.hashSync(this.newPassword, 8);
    return next();
  }
});

module.exports = mongoose.model("User", UserSchema);
