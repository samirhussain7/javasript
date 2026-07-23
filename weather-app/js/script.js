import animation from "./animation.js";
animation();

// Elements
const form = document.querySelector("form");
const input = document.querySelector("input");
const btn = document.getElementById("input-btn");

const current_weather_temp = document.getElementById("current_weather_temp");
const current_weather_img = document.getElementById("current_weather_img");
const current_weather_date = document.getElementById("date");
const current_weather_city = document.getElementById("current_weather_city");
const feels_like_temp = document.getElementById("feels_like_temp");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind_speed");
const pressure = document.getElementById("description"); // Matches HTML id="description"
const errorMessage = document.getElementById("error-message");

const daily_forecast_container = document.getElementById("daily-forecast");
const hourly_forecast_container = document.getElementById("hourly-forecast");

const API_KEY = "fa418728b2510dad8312fa2c81518b2b";

// Helper Function: Weather condition mapping for custom WebP icons
function getWeatherIcon(weatherMain, cloudiness = 0) {
  const weatherImgObj = {
    Rain: "./assets/images/icon-rain.webp",
    Clouds:
      cloudiness > 80
        ? "./assets/images/icon-overcast.webp"
        : "./assets/images/icon-partly-cloudy.webp",
    Clear: "./assets/images/icon-sunny.webp",
    Drizzle: "./assets/images/icon-drizzle.webp",
    Thunderstorm: "./assets/images/icon-storm.webp",
    Fog: "./assets/images/icon-fog.webp",
    Snow: "./assets/images/icon-snow.webp",
  };

  switch (weatherMain.toLowerCase()) {
    case "rain": return weatherImgObj.Rain;
    case "clouds": return weatherImgObj.Clouds;
    case "clear": return weatherImgObj.Clear;
    case "drizzle": return weatherImgObj.Drizzle;
    case "thunderstorm": return weatherImgObj.Thunderstorm;
    case "snow": return weatherImgObj.Snow;
    case "fog":
    case "mist":
    case "haze":
    case "smoke":
    case "dust":
    case "sand":
    case "ash":
    case "squall":
    case "tornado": return weatherImgObj.Fog;
    default: return weatherImgObj.Clear;
  }
}

// Search Form Submit Handler
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cityName = input.value.trim();
  if (cityName !== "") {
    if (cityName.length < 3) {
      errorMessage.textContent = "Please enter a valid city name!";
      return;
    } else {
      getWeatherData(cityName);
      getWeatherForecast(cityName);
      errorMessage.textContent = "";
    }
  } else {
    errorMessage.textContent = "Please enter a valid city name!";
  }
});

// Fetch Current Weather Data
async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    form.reset();

    // Date Format: "Tuesday, July 21, 2026"
    const now = new Date();
    current_weather_date.textContent = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    current_weather_city.textContent = `${data.name}, ${data.sys.country}`;
    current_weather_img.src = getWeatherIcon(data.weather[0].main, data.clouds.all);

    current_weather_temp.textContent = `${Math.round(data.main.temp)}°C`;
    feels_like_temp.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${Math.round(data.main.humidity)}%`;
    wind_speed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    if (pressure) pressure.textContent = `${data.main.pressure} hPa`;

  } catch (error) {
    console.error(error.message);
    errorMessage.textContent = "City not found. Please try again.";
  }
}

// Fetch Forecast (Daily & Hourly)
async function getWeatherForecast(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) return;

    const data = await response.json();

    // 1. HOURLY FORECAST
    if (hourly_forecast_container) {
      hourly_forecast_container.innerHTML = `
        <div class="w-full flex items-center justify-between shrink-0 mb-2">
          <h2 class="text-xl font-semibold">Hourly forecast</h2>
        </div>
      `;

      const hourlyList = data.list.slice(0, 7);

      hourlyList.forEach((item, index) => {
        const date = new Date(item.dt * 1000);
        const timeStr = index === 0 ? "Now" : date.toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
        });

        const iconPath = getWeatherIcon(item.weather[0].main, item.clouds.all);
        const temp = Math.round(item.main.temp);

        const hourlyCard = `
          <div class="w-full p-3 pr-4 bg-gray-700 rounded-xl flex items-center justify-between shrink-0">
            <div class="flex items-center gap-4">
              <img class="w-12 select-none" src="${iconPath}" alt="weather icon" />
              <h2 class="font-semibold text-2xl">${timeStr}</h2>
            </div>
            <h2 class="font-semibold opacity-70 text-lg">${temp}°</h2>
          </div>
        `;

        hourly_forecast_container.innerHTML += hourlyCard;
      });
    }

    // 2. DAILY FORECAST
    if (daily_forecast_container) {
      const dailyList = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

      let dailyCardsHTML = "";
      dailyList.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const iconPath = getWeatherIcon(item.weather[0].main, item.clouds.all);
        const tempMax = Math.round(item.main.temp_max);
        const tempMin = Math.round(item.main.temp_min);

        dailyCardsHTML += `
          <div class="w-full h-full p-3 rounded-xl bg-gray-800 border border-gray-600 flex flex-col items-center justify-center gap-4">
            <h2 class="font-semibold text-xl opacity-85">${dayName}</h2>
            <img class="w-16 select-none" src="${iconPath}" alt="${item.weather[0].main}" />
            <h2 class="w-full flex items-center justify-between font-semibold">
              <span class="opacity-85">${tempMax}°C</span>
              <span class="opacity-60">${tempMin}°C</span>
            </h2>
          </div>
        `;
      });

      daily_forecast_container.innerHTML = `
        <h2 class="font-bold text-xl mb-5">Daily forecast</h2>
        <div class="grid grid-cols-3 grid-rows-2 md:grid-rows-1 md:grid-cols-5 gap-4 shrink">
          ${dailyCardsHTML}
        </div>
      `;
    }

  } catch (err) {
    console.error("Forecast Fetch Error:", err);
  }
}

// Default initial loader
getWeatherData("Delhi");
getWeatherForecast("Delhi");