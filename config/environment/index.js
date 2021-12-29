"use strict";
const path = require("path");
const _ = require("lodash");
require("dotenv").config();

if (!process.env.BEERH_NODE_ENV) {
  console.log(
    "Environment Not Set. Please set BEERH_NODE_ENV to development | test"
  );
  requiredProcessEnv(BEERH_NODE_ENV);
  process.exit(2);
}

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
}
// All configurations will extend these options
// ============================================
let config = {
  env: process.env.BEERH_NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + "/../../.."),

  // Server port
  port: process.env.PORT || 8000,

  // Server IP
  ip: process.env.IP || "0.0.0.0",
  // Should we populate the DB with sample data?
  seedDB: false,
  mongo: {
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  selfDomain: "erpfs.com",
};
// Export the config object based on the ROLEGENIUS_NODE_ENV
// ==============================================
module.exports = _.merge(
  config,
  require("./" + process.env.BEERH_NODE_ENV + ".js") || {}
);
