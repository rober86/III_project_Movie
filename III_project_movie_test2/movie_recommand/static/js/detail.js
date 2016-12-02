
function doFirst() {

    $(document).ready(function(e) {
        var psoterderid = window.location.href;
        clickedmovie = psoterderid.split('/')[5].split('=')[1];
        $.ajax({
            url: "./third", // http://127.0.0.1:8000/AB103Movie/third?clickmovie=clickmovie
            data: { clickmovie: clickedmovie }, // data = each movie
            success: function(data) {
                createRecImages(data); // if get response successfully, sent return data to createType function
            }
        }); // end of  $.ajax({
    }); // end of $(document).ready(function(e) {

}

function createRecImages(posters) {
    // return data contains 3 userchoosen + 12 recommand movies, seperate by space
    // recommand movies = posters.split(' ')[1] and split by , get reaommand movies list
    posterimages = posters.split(' ')[1].split(',');

    for (i = 0; i < posterimages.length; i++) {

        // create div tag for each movie
        newtag = document.createElement('div');

        // create div tag for each movie
        newATag = document.createElement('a');
        // href = "/AB103Movie/introduction/detail?movieid=posterID"
        newATag.href = "/AB103Movie/introduction/detail?movieid=" + posterimages[i];

        // create img tag for each movie
        var img = document.createElement('img');
        // poster path = "/static/posters/posterID.jpg"
        img.src = "/static/posters/" + posterimages[i] + ".jpg";
        // img.href = "/AB103Movie/introduction/detail?movieid=" + posterimages[i];

        // put img tag into a
        newATag.appendChild(img);
        // put a tag into div
        newtag.appendChild(newATag);
        // put div into <section class="center slider" id="mainsection">
        document.getElementById('mainsection').appendChild(newtag);

    } // end of for (i = 0; i < posterimages.length; i++) {

    // check document state
    switch (document.readyState) {
        case "loading": // loading state
            break;

        case "interactive": // in this state DOM is ready
            break;

        case "complete": // the whole document is ready
            // find posters
            var img = $('section.center').find('div').find('img');

            // if posters is in the document
            if ($(img).is(':visible')) { //if img is visible on the page
                // call slick function
                $(".center").slick({
                    dots: false,
                    infinite: true,
                    centerMode: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: false,
                }); //end of $(".center").slick({
            } // end of if ($(img).is(':visible')) {
    } // end of switch (document.readyState) {

}

window.addEventListener('load', doFirst, false);