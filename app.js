"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes.js");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router.routes(app);

exports.appInstance = app;