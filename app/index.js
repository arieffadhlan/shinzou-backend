const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("../config/router");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(router);

module.exports = app;