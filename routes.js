/**
 * Main application routes
 */

"use strict";

module.exports = function (app) {
  app.use("/v1/account/auth", require("./api/auths"));
  app.use("/v1/account", require("./api/users"));
};
