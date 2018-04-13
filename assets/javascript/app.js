// JS won't run until HTML is done loading
$(document).ready(function () {

  // JS variables, such as "animalSearched", api-key:
  var apiKey = "49bd46fd5aab11a948d0cf49fdb22633";
  var animalSearched = "Dog";
  var dogObjects = [];
  var catObjects = [];
  var miscObjects = [];
  var zipcode = sessionStorage.getItem("zipcode");
  var dogSelected = sessionStorage.getItem("dogSelected");
  var catSelected = sessionStorage.getItem("catSelected");
  var miscSelected = sessionStorage.getItem("miscSelected");
  console.log(zipcode);
  console.log("dogSelected: " + dogSelected);
  console.log("catSelected: " + catSelected);
  console.log("miscSelected" + miscSelected);

  $('.animal-box').on('click', function () {
    console.log("poop");
    if ($(this).attr("chosen") === "true") {
      $(this).attr("chosen", "false");
      $(this).removeClass('highlight-border')
    } else {
      $('.animal-box').attr("chosen", "false");
      $(this).attr("chosen", "true");
      $('.animal-box').removeClass('highlight-border');
      $(this).addClass('highlight-border');
    }
  });

  if (dogSelected === "true") {
    console.log("got dogs");
    getDawgs();
  }

  if (catSelected === "true") {
    console.log("got cats");
    getKitties();
  }

  if (miscSelected === "true") {
    console.log("got misc");
    getMisc();
  }


  // Jquery on click event for submit button, should grab zip code box
  $('#submit').on('click', function () {
    zipcode = $('#zipcode').val();
    sessionStorage.setItem("zipcode", zipcode);

    if ($("#dog-box").attr("class").includes("highlight-border"))
      sessionStorage.setItem("dogSelected", true);
    else
      sessionStorage.setItem("dogSelected", false);

    if ($("#cat-box").attr("class").includes("highlight-border"))
      sessionStorage.setItem("catSelected", true);
    else
      sessionStorage.setItem("catSelected", false);

    if ($("#misc-box").attr("class").includes("highlight-border"))
      sessionStorage.setItem("miscSelected", true);
    else
      sessionStorage.setItem("miscSelected", false);
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
  $('').on('click', function () {

  });

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
      console.log("dogObjects Array:");
      console.log(dogObjects);
      $(".img-card").attr("src", dogObjects[0].picture);
      $(".pet-name").text(dogObjects[0].name);
      $("#description").text(dogObjects[0].description);
    }).catch((error) => {
      console.log(error);
    });
  }

  function getKitties() {
    var queryURL = "https://api.petfinder.com/pet.find?key=" + apiKey + "&output=full&format=json&animal=cat&location=27560";

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

        var newCat = {
          name: response.petfinder.pets.pet[i].name.$t,
          picture: pictureURL,
          description: response.petfinder.pets.pet[i].description.$t,
          zip: response.petfinder.pets.pet[i].contact.zip.$t
        }
        catObjects.push(newCat);
      }
      console.log(response);
      console.log("catObjects Array:")
      console.log(catObjects);

      $(".img-card").attr("src", catObjects[0].picture);
      $(".pet-name").text(catObjects[0].name);
      $("#description").text(catObjects[0].description);
    }).catch((error) => {
      console.log(error);
    });
  }

  function getMisc() {
    var queryURL = "https://api.petfinder.com/pet.find?key=" + apiKey + "&output=full&format=json&animal=smallfurry&location=27560";

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

        var newMisc = {
          name: response.petfinder.pets.pet[i].name.$t,
          picture: pictureURL,
          description: response.petfinder.pets.pet[i].description.$t,
          zip: response.petfinder.pets.pet[i].contact.zip.$t
        }
        miscObjects.push(newMisc);
      }
      console.log("Miscellaneous Furry Animals JSON API")
      console.log(response);
      console.log("miscObjects array:")
      console.log(miscObjects);
      $(".img-card").attr("src", miscObjects[0].picture);
      $(".pet-name").text(miscObjects[0].name);
      $("#description").text(miscObjects[0].description);
    }).catch((error) => {
      console.log(error);
    });
  }
});

function flip() {
  $('.card').toggleClass('flipped hidden');
};


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
};

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
};



