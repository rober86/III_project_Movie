var storage = sessionStorage;

function doFirst() {
    //先跟HTML畫面產生關聯,再建事件聆聽的功能

    //find images
    var posters = $('.image.fit');
    // find aside
    var aside = $('#aside');
    // find later button
    var later = $('#later')

    chooseList = []; // This is the list for saving choosen posters
    // to each image, when click add a class name = selected, selected will have a different css
    $(posters).each(function() {

        var poster = jQuery(this);
        poster.click(function(e) {

            // add class selected to the click poster
            poster.toggleClass('selected');

            // get the id of the selected poster
            choose = this.id;
            // if the selected id is in the list take it out
            if (chooseList.indexOf(choose) != -1) {
                var index = chooseList.indexOf(choose);
                chooseList.splice(index, 1);
                // if the selected id is not in the list put it in the list
            } else {
                chooseList.push(choose);
            }

            // if the number of selected is bigger then 3, remove class selected
            if ($('.image.fit.selected').length >= 4) {
                poster.toggleClass('selected');
            }

            // if the number of selected is 3
            if ($('.image.fit.selected').length === 3) {
                // alert("OK");
                // add a class showuo to aside, and aside will showup by css
                aside.toggleClass('showup');
            }

            // store the list in the sessionStorage
            storage['movieList'] = chooseList;



        }); //end of poster.click(function(e) 
    }); // end of $(posters).each(function()

    // if click later, hide aside
    $(later).click(function(e) {
        aside.toggleClass('showup');
    });

}
window.addEventListener('load', doFirst, false);



//find images
// posters = document.querySelectorAll('.image.fit');

// to each image, when click add a class name = selected, selected will have a different css
// posters.forEach(function() {

//     this.addEventListener('click', function() {
//         $(this).toggleClass('selected');
//     });
// });