// JS won't run until HTML is done loading
$(document).ready(function() {

  // JS variables, such as "animalSearched", api-key:
  var apiKey = "49bd46fd5aab11a948d0cf49fdb22633";
  var animalSearched = "Dog";

  // Jquery on click event for submit button, should grab zip code box
  $('#submit').on('click', function() {
    var zipCode = $('#zipCode').val();
    console.log(zipCode);  
    console.log(getDawgs());  
  });
    var addClass = 'highlight-border';
    var cols = $('.highlight').click(function () {
        $(this).toggleClass(addClass);
    });

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    };

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    };
  
  // Jquery on click event for clicking left button on their keyboard ("dislike/swipe left on a pet")
  $('#swipe_dislike').on('click', function(){

  })

  // Jquery on click event for middle button on keyboard ("get a pet's info")
  $('.info').on('click', function(){
      
  })
  // Jquery on click event for clicking right button on the page ("like/swipe right on a pet")
  $('#swipe_like').on('click', function(){
      
  })
  // Jquery method for pet's pic to change after clicking 'info' button
  $('').on('click', function(){

  })

  // JS method for getting API request

  function getDawgs(){
  var queryURL = "https://api.petfinder.com/pet.getRandom?key="+apiKey+"&output=full&format=json&animal=dog";
  var returnValue;
    
    jQuery.ajax({
      type: 'GET',
      url: queryURL,
      dataType: 'jsonp'
    }).then((response)=> {
      console.log(response);
      returnValue = response;
    }).catch((error)=>{
      console.log(error);
    });

  return returnValue;
  // console.log("end of getDawgs method");
  }

  //getDawgs();



function flip() {
  $('.card').toggleClass('flipped');
};
});



