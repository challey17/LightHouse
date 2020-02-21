"use strict";

let results;

let currentTime = new Date().getUTCHours();

console.log(currentTime);
//submit event listener
$("#user-selection").submit(function(event) {
  event.preventDefault();

  displaySelectedWeather(results);
});

$(document).ready(function() {
  console.log($("#user-time").val());
  $("#user-time").change(function() {
    console.log($("option:selected", this).text());
  });
  //clear results on click of reset btn
  $("#reset").on("click", function(event) {
    $("#selected-weather-results").empty();
  });
});

////User Selected Time////
function displaySelectedWeather(jsonData, requestedTime) {
  let selectedTime = !requestedTime ? $("#user-time").val() : requestedTime;
  //convert units from Json data//
  let selectedAirTemp =
    jsonData.hours[selectedTime].airTemperature[0].value * 2 + 32;
  let selectedWindDirection = "test";
  if (jsonData.hours[selectedTime].windDirection[0].value <= 90) {
    selectedWindDirection = "NE";
  } else if (
    jsonData.hours[selectedTime].windDirection[0].value >= 91 &&
    jsonData.hours[selectedTime].windDirection[0].value <= 180
  ) {
    selectedWindDirection = "SE";
  } else if (
    jsonData.hours[selectedTime].windDirection[0].value >= 181 &&
    jsonData.hours[selectedTime].windDirection[0].value <= 270
  ) {
    selectedWindDirection = "SW";
  } else if (
    jsonData.hours[selectedTime].windDirection[0].value >= 271 &&
    jsonData.hours[selectedTime].windDirection[0].value <= 360
  ) {
    selectedWindDirection = "NW";
  }

  let selectedWindSpeed =
    jsonData.hours[selectedTime].windSpeed[0].value * 2.237;

  let selectedGust = jsonData.hours[currentTime].gust[0].value * 2.237;

  let selectedWaterTemp =
    jsonData.hours[selectedTime].waterTemperature[0].value * 2 + 32;

  //add to DOM
  if (requestedTime) {
    $("#current-weather-results").append(
      `<li><h2>current conditions:</h2></li>
      
      <li>Air Temp: ${Math.round(selectedAirTemp)}°F</li>
      
     <li>Wind Direction: ${selectedWindDirection}</li>
     <li>Wind Speed: ${Math.round(selectedWindSpeed)} mph</li>
     <li>Gust: ${Math.round(selectedGust)} mph</li>
     `
    );
  } else {
    $("#selected-weather-results").append(
      `<li><h2>${$("option:selected", this).text()}</h2></li>
    <li>Air Temp: ${Math.round(selectedAirTemp)}°F</li>
    
   <li>Wind Direction: ${selectedWindDirection}</li>
   <li>Wind Speed: ${Math.round(selectedWindSpeed)} mph</li>
   <li>Gust: ${Math.round(selectedGust)} mph</li>
   `
    );
  }
}

// fetch to Storm Glass API  //

const lat = 27.7;
const lng = -82.74;
const currrentUTCtime = Date.UTC();

const params = [
  "airTemperature",
  "windDirection",
  "windSpeed",
  "gust",
  "waterTemperature"
].join(",");

/*fetch(
  `https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&params=${params}&time=${currrentUTCtime}&source=sg`,
  {
    headers: {
      Authorization:
        "db77f6ce-46f5-11ea-8bd6-0242ac130002-db77f7e6-46f5-11ea-8bd6-0242ac130002"
    }
  }
)
  .then(response => response.json())
  .then(jsonData => {
    results = jsonData;
    console.log(jsonData);

    displaySelectedWeather(jsonData, currentTime);
  });*/
