const movieInfoDisplay = document.getElementById('movie-info-display');

// Storing Favourite list in array
var favMovies = [];
var oldArray = [];


function displayMovie() {

    // Getting data from localstorage
    let data = JSON.parse(localStorage.getItem("Movies Information"));


    // Adding Poster as bg image

    document.body.style.backgroundImage = `url(${data.Poster}), linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0) 250%)`;


    // Creating movie details display
    movieInfoDisplay.innerHTML = `
        <div class="movie-page">
            <div class="movie-poster">
                <img src = ${data.Poster} alt="Movie Image">
            </div>

            <div class="movie-details">
                <h1>${data.Title}</h1>

                <hr>

                <div class=""Actors><b>Actress:</b> ${data.Actors}</div>

                <h3>Plot:</h3>
                <div class="plot">
                    ${data.Plot}
                </div>
                <div class="year"><b>Year:</b> ${data.Year}
                </div>
                <div class="d-flex">
                    <div class="imdb-rating">
                        <b>IMDb Rating:</b> ${data.imdbRating}
                    </div>
                    
                    <div id="favbtn">
                        <i class="fa-regular fa-heart fa-2xl"></i>
                    </div>
                    
                </div>
            </div>
        </div>
    `;

    // addeventlistner to add favorite movie to list
    document.getElementById('favbtn').addEventListener("click", (e) => addToFav(e, data.imdbID));
}

// Calling function to display the movie details

displayMovie();


// Adding fav movies in local storage

function addToFav(e, data) {

    // preventing default behavior
    e.preventDefault();
    document.getElementById('favbtn').innerHTML = `<i class="fa-solid fa-heart fa-2xl"></i>`;
    document.getElementById('favbtn').style.color = "red";

    // To add the movie only once into list 

    if(!favMovies.includes(data.toString())) {
        favMovies.push(data.toString());
    }

    console.log(favMovies);

    // checking whether the local storage is empty or not if empty  then push data directly 
    oldArray = JSON.parse(localStorage.getItem("Favourite Movies"));

    if(oldArray == null) {
        localStorage.setItem("Favourite Movies", JSON.stringify(favMovies));
    }

    // Appending only new entries from oldArray

    else {
        favMovies.forEach((movies) => {
            if(!oldArray.includes(movies)) {
                oldArray.push(movies);
            }
        });
        localStorage.setItem("Favourite Movies", JSON.stringify(oldArray));
    }   

}

