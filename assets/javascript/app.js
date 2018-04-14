// JS won't run until HTML is done loading
$(document).ready(function () {

  // JS variables, such as "animalSearched", api-key:
  var apiKey = "49bd46fd5aab11a948d0cf49fdb22633";
  var animalSearched = "Dog";
  var dogObjects = [];
  var catObjects = [];
  var miscObjects = [];
  var distanceCalculated = false;
  var zipcode = sessionStorage.getItem("zipcode");
  var dogSelected = sessionStorage.getItem("dogSelected");
  var catSelected = sessionStorage.getItem("catSelected");
  var miscSelected = sessionStorage.getItem("miscSelected");
  var googleKey = "AIzaSyBi_UnjyKLkvS42XI58I5VqmAcd2Fo0-r8";
  var distance;
  var cardIndex = 0;

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
    getDawgs("dog");
  }

  if (catSelected === "true") {
    console.log("got cats");
    getDawgs("cat");
  }

  if (miscSelected === "true") {
    console.log("got misc");
    getDawgs("smallfurry");
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
  // Jquery method for pet's pic to change after clicking 'like' or 'dislike' buttons
  $('.rate').on({
    'click': function () {
      $(".img-card").attr("src", dogObjects[++cardIndex].picture);
      $(".pet-name").text(dogObjects[cardIndex].name);
      $("#description").text(dogObjects[cardIndex].description);
      $("#distance").html(dogObjects[cardIndex].distance);
      $("#email").text("Email for more info at: "+dogObjects[cardIndex].email);
    } 
  });


  // JS method for getting API request

  function getDawgs(animal) {
    var queryURL = "https://api.petfinder.com/pet.find?key=" + apiKey + "&output=full&format=json&animal="+animal+"&location=" + zipcode.toString();

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
          zip: response.petfinder.pets.pet[i].contact.zip.$t,
          location: response.petfinder.pets.pet[i].contact.city.$t + ", " + response.petfinder.pets.pet[i].contact.state.$t,
          email: response.petfinder.pets.pet[i].contact.email.$t,
          phone: response.petfinder.pets.pet[i].contact.phone.$t
        }

        dogObjects.push(newDog);

      }
      getDistance("A", "B");
      console.log(response);
      console.log("dogObjects Array:");
      console.log(dogObjects);
      console.log(dogObjects[0].picture)
      $(".img-card").attr("src", dogObjects[cardIndex].picture);
      $(".pet-name").text(dogObjects[cardIndex].name);
      $("#description").text(dogObjects[cardIndex].description);
      $("#email").text("Email for more info at: "+dogObjects[cardIndex].email);
      $("#location").text(dogObjects[cardIndex].location);
      $("#phone").text(dogObjects[cardIndex].phone);
     // $("#distance").html(dogObjects[0].distance);

    }).catch((error) => {
      console.log(error);
    });
  }

  

  function getDistance() {
    var index = 0;
    for (var i = 0; i < 25; i++) {
      //Find the distance
      var distanceService = new google.maps.DistanceMatrixService();
      console.log("Origins: "+zipcode+"   Destination: "+dogObjects[i].zip)
      distanceService.getDistanceMatrix({
        origins: [zipcode],
        destinations: [dogObjects[i].zip],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: false
      },
        function (response, status) {
          if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log('Error:', status);
          } else {
          
              distance = response.rows["0"].elements["0"].distance.text;
            if (distance === "1 ft")
              distance = "Near You!"
              
            if(index===0)
              $("#distance").text(distance);

              dogObjects[index++].distance = distance;
          }
        });
    }
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
