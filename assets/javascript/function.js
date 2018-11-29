//Initial buttons in my heroesArray//
let heroesArray = ["Batman", "Spiderman", "John Cena", "Iron Man", "Goku"];

//Function that calls the API through AJAX, then create 10 GIFs with individual attributes and create a div that will store each GIF. Each GIF will then be prepended to the HTML// 

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

        //On click function that changes the data-state that will either make each GIF move or stay still//

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

//function that creates buttons from the intial heroesArray//

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

//Click event that takes values entered in the search bar and adds a new button to be added to heroesArray//

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    let hero = $("#gif-input").val().trim();
    heroesArray.push(hero);
    renderButtons();
});

//Onloads everything//

$(document).on("click", ".gif-btn", displayHeroGif);

renderButtons();