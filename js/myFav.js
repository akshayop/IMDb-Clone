var storageString = localStorage.getItem("Favourite Movies");
var myListArray = JSON.parse(storageString);


// for each list item

if(myListArray == null) {
    console.log("empty");
}

else {
    myListArray.forEach(async(id) => {
        const result = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=5d916c6a`);
        const data = await result.json();
    
        if(data.Response == "True") {
            favMovieList(data)   
        }
    });
}


// displaying the added favourite movies deatils
function favMovieList(data) {
    var eachListItem = document.createElement("div");
    eachListItem.classList.add("list-item");

    eachListItem.innerHTML = `
        <div class="movies-details">
            <div class="tumbnail">
                <a href="movieInfo.html?id=${data.imdbID}">
                    <img src=${data.Poster} alt="Movie Poster">
                </a>
            </div>

            <div id="details">
                <div class="title">
                    ${data.Title}
                </div>

                <div class="remove-movie" id='${data.imdbID}' onclick= "deleteMovie(id)">
                    <i class="fa-solid fa-trash fa-xl"></i>
                </div>
            </div>
        </div>
    `;
    document.getElementById("list-container").appendChild(eachListItem);
 
}

// funtion to delete individual favourite movie

async function deleteMovie(ID) {
    
    if(window.confirm('are you sure.... You want to Delete It?')) {
        var temp = await JSON.parse(localStorage.getItem("Favourite Movies"));
        var i = temp.indexOf(ID);

        await temp.splice(i, 1);
        await localStorage.setItem("Favourite Movies", JSON.stringify(temp));
        await window.location.reload();
    }
}


// Clearing all favourite movies from list

document.getElementById('clear-all').addEventListener("click", function() {
    if(myListArray == null) {
        alert("Favourite list is Empty");
    }
    else {
        if(window.confirm("Are Yoy Sure, You want to delete All movies from this list?.......")){
            localStorage.clear();
            window.location.reload();
        }
    }

});
