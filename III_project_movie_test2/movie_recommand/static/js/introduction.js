var storage = sessionStorage;

function doFirst() {

    // get choosen movie from sessionStorage
    var movieListString = storage.getItem('movieList');
    // movielist:1418834,1291549,1309046, split by , and sort
    var movies = movieListString.split(',').sort();

    // cancat movies for jquery gets' data
    liststring = movies[0] + ',' + movies[1] + ',' + movies[2];

    // get by jquery
    $(document).ready(function(e) {
        $.get({
            url: "./recommandlists", // http://127.0.0.1:8000/AB103Movie/recommandlists?movielist=liststring
            data: { movielist: liststring }, // data = movies choosen by user
            success: function(data) {
                createImages(data); // if get response successfully, sent return data to createImages function
            }
        })
    }); // end of $(go).click(function(e) {
}

function createImages(posters) {
    // return data contains 3 userchoosen + 12 recommand movies, seperate by space
    // recommand movies = posters.split(' ')[1] and split by , get reaommand movies list
    posterimages = posters.split(' ')[1].split(',');

    for (i = 0; i < posterimages.length; i++) {

        // create div tag for each movie
        newtag = document.createElement('div');

        // create img tag for each movie
        var img = document.createElement('img');
        // poster path = "/static/posters/posterID.jpg"
        img.src = "/static/posters/" + posterimages[i] + ".jpg";

        // put img tag into div
        newtag.appendChild(img);
        // put div into <section class="center slider" id="mainsection">
        document.getElementById('mainsection').appendChild(newtag);

    } // end of for (i = 0; i < posterimages.length; i++) {
}

window.addEventListener('load', doFirst, false);