var animal = $.urlParam("animal");
var zip = $.urlParam("zip");
var apiKey = "49bd46fd5aab11a948d0cf49fdb22633";

var queryURL = `https://api.petfinder.com/pet.find?key=${apiKey}&output=full&format=json&animal=${animal}&location=${zip}`;

jQuery.ajax({
    type: 'GET',
    url: queryURL,
    dataType: 'jsonp'
}).then((response) => {

    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }
});
    console.log($.urlParam("animal"));
    console.log($.urlParam("zip"));