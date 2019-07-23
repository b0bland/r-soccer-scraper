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

app.get("/scrape", function(req,res) {
    axios.get("https://old.reddit.com/r/soccer/").then(function(response) {

        var $ = cheerio.load(response.data);

        $("a.title").each(function(i,element) {
            var result = {};

            result.title = $(this).text();
            result.link = $(this).attr("href");

            db.Article.create(result).then(function(dbArticle) {
                console.log(dbArticle);
            }).catch(function(err) {
                console.log(err);
            })
        })
    })
})

app.get("/articles", function(req,res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err) {
            res.json(err);
        })
})