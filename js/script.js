const searchBox = document.getElementById('search');
const resultsDiv = document.getElementById('results');
const movieContainer = document.getElementById('movie-container');




// Load Movies from OMDb api
async function loadMovies(searchItem) {
    const apiURL = `https://www.omdbapi.com/?s=${searchItem}&page=1&apikey=5d916c6a`;
    const responses = await fetch(`${apiURL}`);
    const data = await responses.json();
   
    if(data.Response == "True") {
        movieList(data.Search);

    }
}

// checking whether the Suggesting Movies has to display or not.
function suggestMovies() {
    let searchItem = (searchBox.value).trim();
    if(searchItem.length > 0 ) {
        resultsDiv.classList.remove('hide-search');
        loadMovies(searchItem);
    }

    else {
        resultsDiv.classList.add('hide-search')
    }
}


// Display the result 

function movieList(movies) {
    // clearing resultDiv
    resultsDiv.innerHTML = ""

    for(let index = 0; index < movies.length; index++) {
        let movieItemList = document.createElement('div');

        movieItemList.dataset.id = movies[index].imdbID;
        movieItemList.classList.add('search-item');
        // console.log(movieItemList.dataset.id);
        
        // checking whether the movie image consist or not

        if(movies[index].Poster != "N/A") {
            posterM = movies[index].Poster;
        }
            

        else {
            posterM = "img/Image Not Found.png";
        }

        // displaying the search result

        movieItemList.innerHTML = 
            `
            <div class = "movie-tumbnail d-flex">
                <img src= "${posterM}"
            </div>
            
            <div class = "movie-info">
                <h3>${movies[index].Title}</h3>
                <p>${movies[index].Year}</p>
            </div> `;
            
        resultsDiv.appendChild(movieItemList);
    }
    loadMoviesDetail();     
}

// function to loadMovie deatils using api

function loadMoviesDetail() {
    const searchList = resultsDiv.querySelectorAll('.search-item');
    searchList.forEach(movie => {
        
        movie.addEventListener('click', async () =>{
            searchBox.value = "";
            // const res = await fetch(`https://www.omdbapi.com/?s=${movie.dataset.id}&page=1&apikey=5d916c6a`);
            // const movieDetail = await res.json();

            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=5d916c6a`);
            const movieDetails = await result.json();

            console.log(movieDetails);

            // Storing movie details in localStorage for further use

            localStorage.setItem("Movies Information", JSON.stringify(movieDetails));
            parent.location = "movieInfo.html";
        });

    });
}





