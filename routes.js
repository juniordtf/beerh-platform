/**
 * Main application routes
 */

"use strict";

module.exports = function (app) {
  app.use("/v1/account/auth", require("./api/auths"));
  app.use("/v1/account", require("./api/users"));
  app.use("/v1/recipe", require("./api/recipes"));
  app.use("/v1/production", require("./api/productions"));
  app.use("/v1/group", require("./api/groups"));
};
