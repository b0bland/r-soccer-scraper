
$("#scrapeButton").on("click", function(event) {
    console.log("Click success")
    $.get("/scrape", function(data) {
        console.log("/scrape success")
        console.log(data)
        if (data) {window.location.href = "/articles"}
    })
    
  })