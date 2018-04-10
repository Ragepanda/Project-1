// JS variables, such as "animalSearched", api-key, api-url;
var apiKey = "49bd46fd5aab11a948d0cf49fdb22633";
var animalSearched = "Dog";
var apiUrl = "";
// Jquery on click event for submit button, should grab zip code box
$('#enter').on('click', function() {
    var zipCode = $('#zipCode').val();
    console.log(zipCode);    
// Jquery event for clicking left arrow on the page
$('').on('click', function(){

})

// Jquery event for clicking left arrow on their keyboard

// Jquery event for right arrow on keyboard

// Jquery event for clicking right arrow on the page

// JS method for replacing entire page with new HTML
.innerHTML
// JS method for getting API request
var queryURL = "";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });