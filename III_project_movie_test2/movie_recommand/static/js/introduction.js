var storage = sessionStorage;
var typeInDict = {};
var count = 0;

function doFirst() {

    // get choosen movie from sessionStorage
    var movieListString = storage.getItem('movieList');
    // movielist:1418834,1291549,1309046, split by , and sort
    var movies = movieListString.split(',').sort();

    // cancat movies for jquery gets' data
    liststring = movies[0] + ',' + movies[1] + ',' + movies[2];

    // get by jquery
    $(document).ready(function(e) {
        $.ajax({
            url: "./recommandlists", // http://127.0.0.1:8000/AB103Movie/recommandlists?movielist=liststring
            data: { movielist: liststring }, // data = movies choosen by user
            success: function(data) {
                createImages(data); // if get response successfully, sent return data to createImages function
            }
        }); // end of  $.ajax({
    }); // end of $(document).ready(function(e) {

}

function createImages(posters) {
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
                    dots: true,
                    infinite: true,
                    centerMode: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed:1000,
                }); //end of $(".center").slick({
            } // end of if ($(img).is(':visible')) {
    } // end of switch (document.readyState) {

    for (i = 0; i < posterimages.length; i++) {
        // get by jquery
        var len = posterimages.length // count how many movies return
        $(document).ready(function(e) {
            $.ajax({
                url: "./typelists", // http://127.0.0.1:8000/AB103Movie/typelists?movielist=liststring
                data: { typelist: posterimages[i] }, // data = each movie
                success: function(data) {
                    // console.log(data);
                    createType(data, len); // if get response successfully, sent return data to createType function
                }
            }); // end of  $.ajax({
        }); // end of $(document).ready(function(e) {
    } // end of for (i = 0; i < posterimages.length; i++) {

}

function createType(type, len) {

    var movieTypes = type.split("/");
    var movieNumber = len;

    for (i = 1; i < movieTypes.length; i++) {
        if (movieTypes[i].trim() in typeInDict) {
            typeInDict[movieTypes[i].trim()] = typeInDict[movieTypes[i].trim()] + 1;
        } else {
            typeInDict[movieTypes[i].trim()] = 1;
        }
    }; // end of for (i = 1; i < movieTypes.length; i++) {

    // typeInDict = {傢庭:2,傳記:1,冒險:7,劇情:8,動作:3,動畫:3,喜劇:3,奇幻:6,情色:1,愛情:3,懸疑:1,歌舞:1,科幻:3,驚悚:1}
    //    console.log(typeInDict);

    // Create items array
    var items = Object.keys(typeInDict).map(function(key) {
        return [key, typeInDict[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    // Create a new array with only the first 3 items
    typeItems = items.slice(0, 3); // [ [ 劇情:8 ], [ 冒險:7 ], [ 奇幻:6 ] ]



    count += 1; // count number for calling showTypesOnThePage()
    //    console.log(items.slice(0, 3));

    // if count = movies number pass our top three types to function showTypesOnThePage()
    if (count === movieNumber) {
        //        console.log(typeItems);

        var typeforsearch = "";
        for (i = 0; i < typeItems.length; i++){
            typeforsearch =  typeforsearch + typeItems[i][0] + ' '
        };
        // console.log(typeforsearch);
        $.ajax({
            url : "./type_recommand",
            data : { three_type : typeforsearch},
            success : function(data){
                createTypePosters(data);
            }
        });
        showTypesOnThePage(typeItems);
        return;
    } else {
        return;
    }

}

function showTypesOnThePage(typeItems) {

    for (i = 0; i < typeItems.length; i++) {
        // <a href="#" data-tab="tab-1" class="active">
        newaTag = document.createElement('a');
        newaTag.href = "#";
        newaTag.innerText = typeItems[i][0] + "類";
        var fordatatab = "tab-" + (i + 1);
        newaTag.setAttribute('data-tab', fordatatab);
        if (i === 0){
            newaTag.setAttribute('class', "active");
        } else {
            newaTag.setAttribute('class', "");
        }

        // <li><a href="#" data-tab="tab-1" class="active">劇情片</a></li>
        newLi = document.createElement('li');

        // put a tag into li
        newLi.appendChild(newaTag);
        // put li into <ul class="tab-list" id="types-tab">
        document.getElementById('types-tab').appendChild(newLi);

    } // end of for (i = 0; i < typeItems.length; i++) {

    // Tabbed Boxes

	$('.flex-tabs').each( function() {
        var t = jQuery(this),
			tab = t.find('.tab-list li a'),
			tabs = t.find('.tab');

		tab.click(function(e) {

		    var x = jQuery(this),
			    y = x.data('tab');

		    // Set Classes on Tabs
		    tab.removeClass('active');
		    x.addClass('active');

		    // Show/Hide Tab Content
		    tabs.removeClass('active');
		    t.find('.' + y).addClass('active');

		    e.preventDefault();

		});

	});
}

function createTypePosters(lists){

    var listsOfType = lists.split("/");

    for (i = 0; i < listsOfType.length; i++) {
        var typePosters = listsOfType[i].split(",");
        if (typePosters.length >= 10){
            for (j = 0; j< 9; j++) {

                newaimg = document.createElement('img');
                newaimg.src = "/static/posters/" + typePosters[j] + ".jpg";

                innerdiv = document.createElement('div');
                innerdiv.setAttribute('class', "arrow");

                middlediv = document.createElement('div');
                middlediv.setAttribute('class', "image fit");

                innerspan = document.createElement('span');
                innerspan.innerText = "Click Me";

                middlea = document.createElement('a');
                middlea.href = "/AB103Movie/introduction/detail?movieid=" + typePosters[j];
                middlea.setAttribute('class', "link");

                outterdiv = document.createElement('div');
                outterdiv.setAttribute('class', "video col");

                middlediv.appendChild(newaimg);
                middlediv.appendChild(innerdiv);

                middlea.appendChild(innerspan);

                outterdiv.appendChild(middlediv);
                outterdiv.appendChild(middlea);

                var whichtab = "tab" + (i+1);
                document.getElementById(whichtab).appendChild(outterdiv);
            } // end of  for (j = 0; j< 9; j++) {

        } else {
            for (j = 0; j< (typePosters.length)-1; j++) {

                newaimg = document.createElement('img');
                newaimg.src = "/static/posters/" + typePosters[j] + ".jpg";

                innerdiv = document.createElement('div');
                innerdiv.setAttribute('class', "arrow");

                middlediv = document.createElement('div');
                middlediv.setAttribute('class', "image fit");

                innerspan = document.createElement('span');
                innerspan.innerText = "Click Me";

                middlea = document.createElement('a');
                middlea.href = "/AB103Movie/introduction/detail?movieid=" + typePosters[j];
                middlea.setAttribute('class', "link");

                outterdiv = document.createElement('div');
                outterdiv.setAttribute('class', "video col");

                middlediv.appendChild(newaimg);
                middlediv.appendChild(innerdiv);

                middlea.appendChild(innerspan);

                outterdiv.appendChild(middlediv);
                outterdiv.appendChild(middlea);

                var whichtab = "tab" + (i+1);
                document.getElementById(whichtab).appendChild(outterdiv);
            } // end of  for (j = 0; j< 9; j++) {
        }
    } // end of for (i = 0; i < listsOfType.length; i++) {
}

window.addEventListener('load', doFirst, false);
