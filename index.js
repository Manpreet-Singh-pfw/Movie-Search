let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Function to fetch movie data from the OMDb API
let searchMovie = () => {
    let movieName = movieNameRef.value;
    
    // Replace 'YOUR_API_KEY' with your actual OMDb API key
    const apiKey = '276eb5a7';
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    // When the search input field is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please input the name of a movie you want to 🔎</h3>`;
    } else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // if searched movie exists in the database
                if (data.Response == "True") {
                    // updating the heading element
                    var myHeading = document.getElementById("heading");
                    myHeading.textContent = "The Search Result Found 🔎: ";

                    //updating rest of the content
                    result.innerHTML = `
                        <div class="info">
                            <img src=${data.Poster} class="poster">
                            <div>
                                <h2>${data.Title}</h2>
                                <div class="rating">
                                    <img src="star-icon.svg">
                                    <h4>${data.imdbRating}/10</h4>
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class="genre">
                                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                                </div>
                            </div>
                        </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast:</h3>
                        <p>${data.Actors}</p>
                    `;
                }
                // if the searched movie does not exist in the database
                else {
                    result.innerHTML = `<h3 class="msg">Sorry, we didn't find your movie 😔</h3>`;
                }
            })
            // if any other error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
            });
    }
};

// Adding event listener for clicking the search button
searchBtn.addEventListener("click", searchMovie);

// Adding event listener for pressing Enter to search the movie
movieNameRef.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchMovie();
    }
});

// Calling searchMovie function on page load
window.addEventListener("load", searchMovie);
