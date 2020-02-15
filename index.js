"use strict";
// ok here we go

function displayCurrentWeater(jsonData) {
  $("#current-weather-results").append(
    `<li>Air Temp ${jsonData.hours[currentTime].airTemperature[0].value}*C</li>
    
   <li>windDirection ${jsonData.hours[currentTime].windDirection[0].value}</li>
   <li>windSpeed ${jsonData.hours[currentTime].windSpeed[0].value} m/s</li>
   <li>gust ${jsonData.hours[currentTime].gust[0].value} m/s</li>
   <li>waterTemperature ${jsonData.hours[currentTime].waterTemperature[0].value}*C</li>`
  );
}
let currentTime = new Date().getUTCHours();

console.log(currentTime);

//testing fetch api

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

fetch(
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
    // Do something with response data.
    console.log(jsonData.hours[currentTime].airTemperature[0].value);
    console.log(jsonData.hours[currentTime].time);
    displayCurrentWeater(jsonData);
  });

// need to make  function(s) to convert metric units ,
// moonrise/set sunrise/set will return a UTC timestamp, need to convert to local time
// look at this https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
//toLocaleDateString() or toLocaleString() <<< provides date and time when called without params
