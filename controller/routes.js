var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app, db) {
    app.get("/", function(req,res) {
        res.render("index", console.log("Render success"))
    })
    
    app.get("/scrape", function(req,res) {
        db.Article.remove({})
        axios.get("https://old.reddit.com/r/soccer/").then(function(response) {
            var $ = cheerio.load(response.data);
            $("a.title").each(function(i,element) {
                var result = {};

                result.title = $(this).text();

                if ($(this).attr("href").startsWith("/r/")) {
                    var linkurl = "https://old.reddit.com";
                    linkurl += $(this).attr("href");
                    result.link = linkurl;
                }
                else {
                    result.link = $(this).attr("href");
                }
    
                db.Article.create(result).then(function(dbArticle) {
                    // console.log(dbArticle)
                }).catch(function(err) {
                    console.log(err);
                })
            })
            res.send(true)
        })
    })
    
    app.get("/articles", function(req,res) {
        console.log("Step 1")
        console.log(db.Article)
        db.Article.find({})
            .then(function(dbArticle) {
                console.log("Step 2")
                console.log(dbArticle)
                res.render("articles", {article: dbArticle})
            }).catch(function(err) {
                console.log(err);
            })
        
    })
}