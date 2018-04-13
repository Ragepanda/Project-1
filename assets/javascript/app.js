// JS won't run until HTML is done loading
$(document).ready(function () {

  // JS variables, such as "animalSearched", api-key:
  var apiKey = "49bd46fd5aab11a948d0cf49fdb22633";
  var animalSearched = "Dog";
  var dogObjects = [];

  // Jquery on click event for submit button, should grab zip code box
  $('#submit').on('click', function () {
    var zipCode = $('#zipCode').val();
    console.log(zipCode);
  });
  var addClass = 'highlight-border';
  var cols = $('.highlight').click(function () {
    $(this).toggleClass(addClass);
  });



  // Jquery on click event for clicking left button on their keyboard ("dislike/swipe left on a pet")
  $('#swipe_dislike').on('click', function () {

  })

  // Jquery on click event for middle button on keyboard ("get a pet's info")
  $('.info').on('click', function () {

  })
  // Jquery on click event for clicking right button on the page ("like/swipe right on a pet")
  $('#swipe_like').on('click', function () {

  })
  // Jquery method for pet's pic to change after clicking 'info' button
  $('').on('click', function(){

  })

  // JS method for getting API request

 // JS method for getting API request

function getDawgs() {
  var queryURL = "https://api.petfinder.com/pet.find?key=" + apiKey + "&output=full&format=json&animal=dog&location=27560";

  jQuery.ajax({
    type: 'GET',
    url: queryURL,
    dataType: 'jsonp'
  }).then((response) => {

    for (var i = 0; i < 25; i++) {
      var pictureURL;
      if (!("photos" in response.petfinder.pets.pet[i].media))
        pictureURL = "https://i.pinimg.com/originals/4a/e1/35/4ae1350602b3a7ea14b6fabe962aa15f.jpg";

      else
        pictureURL = response.petfinder.pets.pet[i].media.photos.photo[3].$t;

      var newDog = {
        name: response.petfinder.pets.pet[i].name.$t,
        picture: pictureURL,
        description: response.petfinder.pets.pet[i].description.$t,
        zip: response.petfinder.pets.pet[i].contact.zip.$t
      }
      dogObjects.push(newDog);
    }
    console.log(response);
    console.log(dogObjects);


  }).catch((error) => {
    console.log(error);
  });

}
function flip() {
  $('.card').toggleClass('flipped');
};


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
};

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
};

});
