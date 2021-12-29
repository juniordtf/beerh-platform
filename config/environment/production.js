"use strict";
require("dotenv").config();

// Production specific configuration
// =================================

module.exports = {
  // Server IP
  ip: process.env.IP || undefined,

  // Control debug level for modules using visionmedia/debug
  DEBUG: "",

  // Server port
  port: process.env.PORT,

  mongo: {
    uri: process.env.MONGODB_URI,
  },

  selfURL: "http://localhost",
  webApp: {
    url: "http://localhost:80",
  },
};
