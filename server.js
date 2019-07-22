const express = require("express");
const mongoose = require("mongoose");
const exphbs  = require('express-handlebars');
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

