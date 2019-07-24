
$("#scrapeButton").on("click", function(event) {
    console.log("Click success")
    $.get("/scrape", function(data) {
        console.log("/scrape success")
        console.log(data)
      if (data.status) window.location.href = "/articles"
    })
    
  })