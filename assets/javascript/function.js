let heroesArray = ["Batman", "Spiderman", "John Cena", "Iron Man", "Goku"];

function displayHeroGif() {
    let hero = $(this).attr("data-name");
    const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=A5htrbuOVfoZSAmfRZLthIB2ymwt7EcZ&q=" + hero + "&limit=10&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        $("#gif-dump").empty();

        const results = response.data;

        for (let i = 0; i < results.length; i++) {

            const gifDiv = $("<div class='gif'>");

            const rated = results[i].rating;

            const pRating = $("<p>").text("Rating: " + rated);

            gifDiv.append(pRating);

            const gif = $("<img/>");

            gif.addClass("heroes");

            gif.addClass("container");

            gif.addClass("row");

            gif.addClass("col-md-8");

            gif.attr("src", results[i].images.fixed_height_still.url);

            gif.attr("data-still", results[i].images.fixed_height_still.url);

            gif.attr("data-animate", results[i].images.fixed_height.url);

            gif.attr("data-state", "still");

            gifDiv.append(gif);

            $("#gif-dump").prepend(gifDiv);
        }

        $(".heroes").on("click", function () {
            var state = $(this).attr("data-state");
            console.log(this);
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
}

function renderButtons() {
    $("#buttons-view").empty();

    for (let i = 0; i < heroesArray.length; i++) {

        const a = $("<button>");
        a.addClass("gif-btn");
        a.addClass("btn btn-primary");
        a.attr("data-name", heroesArray[i]);
        a.text(heroesArray[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    let hero = $("#gif-input").val().trim();
    heroesArray.push(hero);
    renderButtons();
});

$(document).on("click", ".gif-btn", displayHeroGif);

renderButtons();