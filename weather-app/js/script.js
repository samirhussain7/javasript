import animation from "./animation.js"
animation()

const input = document.querySelector('input')
const btn = document.getElementById('input-btn')
console.log(input.value);

// Elements
const current_weather_temp = document.getElementById('current_weather_temp')
const current_weather_img = document.getElementById('current_weather_img')
const current_weather_date = document.getElementById('date')
const current_weather_city = document.getElementById('current_weather_city')
const feels_like_temp = document.getElementById('feels_like_temp')
const humidity_temp = document.getElementById('humidity_temp')
const wind_speed = document.getElementById('wind_speed')
const precipitation = document.getElementById('precipitation')
const form = document.querySelector("form");

// console.log(
//   input, btn, current_weather_city, current_weather_temp, current_weather_date, current_weather_img, feels_like_temp, humidity_temp, wind_speed, precipitation, form
// );


form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const cityName = input.value.trim();
  if (cityName !== "") {
    console.log(cityName)
    
  } else {
    alert("Please enter a city name!");
  }
  form.reset();
});

async function getWeatherData() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true",
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    current_weather_temp.textContent = `${Math.round(data.current_weather.temperature)}°C`
  } catch (error) {
    console.error(error);
  }


  
}

getWeatherData();

// Location Tracker
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude: ",position.coords.latitude, "longitude: ", position.coords.longitude);
      },
      (error) => {
        console.log(error.code);
        console.log(error.message);
      },
    );
  } else {
    console.warn("Geolocation is not supported in this browser");
  }
}
// getLocation();

