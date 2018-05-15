var x = document.getElementById("location");
var api = "https://fcc-weather-api.glitch.me/api/"
var urlLink;
var lat, lon;
var tempC;
var tempUnit = "C";
getLocation();


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    x.innerHTML = "<h2>Latitude: " + position.coords.latitude.toFixed(1) +  
    "<br>Longitude: " + position.coords.longitude.toFixed(1) + "</h2>"; 
    lat = "lat=" + position.coords.latitude.toFixed(1);
    lon = "lon=" + position.coords.longitude.toFixed(1);
    urlLink = api + "current?" + lat + "&" + lon;  
    getWeather(lat,lon);
}

function getWeather(lat,lon) {
	$.ajax({
		url: urlLink, 
		success: function (result) {
			$("#city").text(result.name + ", ");
			$("#country").text(result.sys.country);
			tempC = result.main.temp.toFixed(1);
			$("#temp").text(tempC+ " " + String.fromCharCode(176));
			$("#tempUnit").text(tempUnit);
			$('<img src="'+ result.weather[0].icon +'">').load(function() {
  				$(this).width(50).height(50).appendTo('#icon');
			});
			//$("#icon").html(<img src="" alt="iconload">);
		}
	});
}

$('.btn').click(function () {
	var currentTempUnit = $("#tempUnit").text();
	var newTempUnit = currentTempUnit === "C" ? "F" : "C";
	$("#tempUnit").text(newTempUnit);
	if (newTempUnit === "F") {
		var tempF = ((tempC * 9 / 5) + 32).toFixed(1);
		$("#temp").text(tempF+ " " + String.fromCharCode(176));
	} else {
		$("#temp").text(tempC+ " " + String.fromCharCode(176));
	}
})





