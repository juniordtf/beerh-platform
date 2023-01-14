/**
 * Main application file
 */

"use strict";
require("dotenv").config();

const express = require("express");
const config = require("./config/environment");
const mongoose = require("mongoose");

//Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.URI, config.mongo.options);
mongoose.connection.on("error", function (err) {
  console.error("MongoDB connection error: " + err);
  process.exit(-1);
});

const app = express();

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fs = require("fs");
const server = require("http").createServer(app);
require("./config/express")(app);
require("./routes")(app);
//require("./config/seed");
//require("./config/data");
//console.log(__dirname);

// Root route of express app
app.get("/", (req, res) => {
  res.send("Welcome to BeerH");
});

app.use("/v1/assets", express.static("public"));
app.use("/v1/uploads", express.static("public/uploads"));

// Start server
server.listen(config.port, function () {
  console.log(
    "Express server listening on %d, in %s mode",
    config.port,
    process.env.BEERH_NODE_ENV
  );
});

// Expose app
exports = module.exports = app;
