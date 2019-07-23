var path = require("path");
var express = require("express");
var mongoose = require("mongoose");
var exphbs  = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req,res) {
    console.log("test" + res)
    res.render("index", console.log("Render success"))
})

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

app.listen(PORT, function() {
    console.log("App running on port " + PORT)
})