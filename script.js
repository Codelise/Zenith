const API_KEY = "2cceedd558bf76da4e27afcf9e6fda46";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

document.addEventListener("DOMContentLoaded", () => {
  // CALL setupEventListeners()
  // CALL loadDefaultCity()  Optional: Load saved city or default
});

// Fetch weather data
async function fetchWeather(city) {
  // SHOW loading state
  try {
    const test_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(test_url);
    const data = await response.json();
    if (response.ok) {
      //  CALL displayCurrentWeather(data)
      //  CALL fetchForecast(city)
      //  APPLY weather theme
    } else {
      throw new Error(`Weather Data unavailable for this city: ${city}`);
    }
  } catch (error) {
    // CALL showError(error message)
  } finally {
    // HIDE loading state
  }
}

function displayCurrentWeather(weatherData) {
  let temperature = Math.round(weatherData.main.temp);
  let cityName = weatherData.name;
  let countryCode = weatherData.sys.country;
  let weatherCondition = weatherData.weather[0].description;
  let humidity = weatherData.main.humidity;
  let windSpeed = weatherData.wind.speed;
  let feelsLike = Math.round(weatherData.main.feels_like);
  let weatherIcon = weatherData.weather[0].icon;

  let currentTime = weatherData.dt;
  let sunrise = weatherData.sys.sunrise;
  let sunset = weatherData.sys.sunset;

  const currentTemp = document.querySelector("#current-temp");
  currentTemp.textContent = temperature + "°C";

  const city = document.querySelector("#city-name");
  city.textContent = cityName + ", " + countryCode;

  const weatherDesc = document.querySelector("#weather-description");
  weatherDesc.textContent = weatherDescription.toUpperCase();

  const humid = document.querySelector("#humidity");
  humid.textContent = humidity + "%";

  const wind_speed = document.querySelector("#wind-speed");
  wind_speed.textContent = windSpeed + "km/h";

  const feels_like = document.querySelector("#feels-like");
  feels_like.textContent = feelsLike + "°C";

  // Apply theme based on weather and time
  // SET isNight = CALL isNightTime(currentTime, sunrise, sunset)
  // CALL applyWeatherTheme(weatherCondition, isNight)
}

function updateWeatherIcon(condition, iconCode) {
  let iconElement = document.querySelector("#main-weather-icon");

  let iconName = "";

  if (condition === "Clear") {
    iconName = "wb_sunny";
  } else if (condition === "Clouds") {
    iconName = "cloud";
  } else if (condition === "Rain") {
    iconName = "rainy";
  } else if (condition === "Drizzle") {
    iconName = "grain";
  } else if (condition === "Thunderstorm") {
    iconName = "thunderstorm";
  } else if (condition === "Snow") {
    iconName = "ac_unit";
  } else if (condition === "Mist" || condition === "Fog") {
    iconName = "foggy";
  } else {
    iconName = "wb_cloudy";
  }

  iconElement.textContent = iconName;
}

// TO BE CONTNUED
