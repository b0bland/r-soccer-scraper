var path = require("path");
var express = require("express");
var exphbs  = require("express-handlebars");
var mongoose = require("mongoose");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

require("./controller/routes")(app, db)

app.listen(PORT, function() {
    console.log("App running on port " + PORT)
})