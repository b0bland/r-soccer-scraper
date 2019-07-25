
$("#scrapeButton").on("click", function(event) {
    console.log("Click success")
    $.get("/scrape", function(data) {
        console.log("/scrape success")
        console.log(data)
        if (data) {window.location.href = "/articles"}
    })
    
  })

$(".articleSave").on("click", function(event) {
    console.log("Save Article Click " + event.target.id)
    var thisId = event.target.id;

    $.ajax({
        method: "GET",
        url: `/articles/save/${thisId}`,
        data: {saved: true},
        success: function (response) {
            window.location.href = "/articles";
        },
        error: function (error) {
          console.log(error);
        }
    })
})