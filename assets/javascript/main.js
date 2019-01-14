let APIkey = "YcdtOtpEnd8HWV0JOe4YRyPzpvm2OxO9";
$('#submitBtn').on("click", function () {
    event.preventDefault();
    let newAnimal = document.getElementById("animalAdd").value;
    let newBtn = $('<button class="animals" data-search="' + newAnimal + '">' + newAnimal + '</button>');
    $("#buttonArea").append(newBtn);

});

$(document).on('click', '.animals', function () {
    let buttonSearch = $(this).data("search");
    // console.log(buttonSearch);

    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q=" + buttonSearch + "&limit=10";

    $("#GIFarea").empty();

    $.ajax({ url: queryURL, method: "GET" }).done(function (response) {
        console.log(response);
        console.log(queryURL);
        for (let i = 0; i < response.data.length; i++) {
            let gif = $('<img src="' + response.data[i].images.fixed_height_still.url + '"> <p>Rating: ' + response.data[i].rating + '</p>');
            gif.attr("data-still", response.data[i].images.fixed_height_still.url)
            gif.attr("data-animate", response.data[i].images.fixed_height.url)
            gif.attr("data-state", "still")
            gif.attr("class", "gif")

            $("#GIFarea").prepend(gif);
        };
        
        $(".gif").on("click", function () {
            var state = $(this).attr("data-state");
            console.log(state);

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"))
                $(this).attr("data-state", "still");
            }

            var dataAnimate = $(this).attr('data-animate');
        })
    });
});





