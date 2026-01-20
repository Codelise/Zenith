// DAY 2: Display Current Weather
const API_KEY = "2cceedd558bf76da4e27afcf9e6fda46";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Fetch weather data
async function fetchWeather(cityName) {
  showLoading();
  const url =
    BASE_URL + "/weather?q=" + cityName + "&appid=" + API_KEY + "&units=metric";
  try {
    const response = await fetch(url);
    if (response.status === 404) {
      throw new Error("City not found. Please check the spelling");
    } else if (response.status === 401) {
      throw new Error("Invalid API key. Please check your configuration.");
    } else if (!response.ok) {
      throw new Error("Unable to fetch weather data. Please try again.");
    }

    const data = await response.json();

    displayCurrentWeather(data);
    fetchForecast(cityName);
    hideLoading();
  } catch (error) {
    hideLoading();
    if (error.message.includes("fetch") || error.name === "TypeError") {
      showError("Network error. Please check your internet connection.");
    } else {
      showError(error.message);
    }
    console.log(error);
  }
}

// Displays current weather on UI
function displayCurrentWeather(weatherData) {
  let temperature = Math.round(weatherData.main.temp);
  let cityName = weatherData.name;
  let countryCode = weatherData.sys.country;
  let weatherCondition = weatherData.weather[0].main;
  let weatherDescription = weatherData.weather[0].description;
  let humidity = weatherData.main.humidity;
  let windSpeed = weatherData.wind.speed;
  let feelsLike = Math.round(weatherData.main.feels_like);
  let weatherIcon = weatherData.weather[0].icon;

  let currentTime = weatherData.dt;
  let sunrise = weatherData.sys.sunrise;
  let sunset = weatherData.sys.sunset;

  document.querySelector("#current-temp").textContent = temperature + "°C";

  document.querySelector("#city-name").textContent =
    cityName + ", " + countryCode;

  document.querySelector("#weather-description").textContent =
    weatherDescription.toUpperCase();

  document.querySelector("#humidity").textContent = humidity + "%";

  document.querySelector("#wind-speed").textContent = windSpeed + "km/h";

  document.querySelector("#feels-like").textContent = feelsLike + "°C";

  updateWeatherIcon(weatherCondition, weatherIcon);

  let isNight = isNightTime(currentTime, sunrise, sunset);
  applyWeatherTheme(weatherCondition, isNight);
  updateFavicon(isNight);
}

// Update Favicon based on Day or night
function updateFavicon(isNight) {
  const favicon = document.querySelector("#favicon");
  if (isNight) {
    favicon.href =
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌙</text></svg>";
  } else {
    favicon.href =
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☀️</text></svg>";
  }
}

// Update weather icon
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

// Applies weather theme
function applyWeatherTheme(weatherCondition, isNight) {
  const body = document.body;

  if (isNight) {
    body.setAttribute("data-weather", "Night");
    return;
  }

  const weatherThemeMap = {
    Clear: "Clear",
    Clouds: "Clouds",
    Rain: "Rain",
    Drizzle: "Rain",
    Thunderstorm: "Thunderstorm",
    Snow: "Snow",
    Mist: "Mist",
    Fog: "Mist",
    Haze: "Mist",
  };

  let themeName = weatherThemeMap[weatherCondition] || "Clear";

  body.setAttribute("data-weather", themeName);
  console.log("Applied theme: " + themeName);
}

// checks if nightime
function isNightTime(currentTime, sunrise, sunset) {
  if (currentTime < sunrise) {
    return true;
  } else if (currentTime > sunset) {
    return true;
  } else {
    return false;
  }
}

// Utility: Captilize first letter
function capitalizeFirstLetter(text) {
  if (text === "") {
    return text;
  }

  let firstChar = text.charAt(0).toUpperCase();
  let restOfText = text.slice(1);

  return firstChar + restOfText;
}

// DAY 3: Search Functionality
// Setup evet listeners
function setupEventListeners() {
  const citySearch = document.querySelector("#city-search");

  citySearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  const retryBtn = document.querySelector("#retry-btn");
  retryBtn.addEventListener("click", () => {
    hideError();
  });
}

// Handles search
function handleSearch() {
  const citySearch = document.querySelector("#city-search");
  const cityName = citySearch.value.trim();

  if (cityName === "") return;

  fetchWeather(cityName);
  citySearch.value = "";

  localStorage.setItem("lastCity", cityName);
}

// Load City from localStorage
function loadDefaultCity() {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    fetchWeather(lastCity);
  } else {
    fetchWeather("Manila");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadDefaultCity();
});

// DAY 4: Loading & Error States
// Shows loading state
function showLoading() {
  const loadingState = document.querySelector("#loading-state");
  loadingState.style.display = "flex";
  const citySearch = document.querySelector("#city-search");
  citySearch.disabled = true;
}

// Hides loading state
function hideLoading() {
  const loadingState = document.querySelector("#loading-state");
  loadingState.style.display = "none";

  const citySearch = document.querySelector("#city-search");
  citySearch.disabled = false;
}

// Shows error state
function showError(errorMessage) {
  const errorState = document.querySelector("#error-state");
  document.querySelector(".error-message").textContent = errorMessage;
  errorState.style.display = "flex";
}

// Hides error state
function hideError() {
  const errorState = document.querySelector("#error-state");
  errorState.style.display = "none";
}

// DAY 5 bukas
// Fetch forecast data
async function fetchForecast(cityName) {
  const url =
    BASE_URL +
    "/forecast?q=" +
    cityName +
    "&appid=" +
    API_KEY +
    "&units=metric";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Unable to fetch forecast");
    }

    const data = await response.json();
    const processedForecast = processForecastData(data);
    displayForecast(processedForecast);
  } catch (error) {
    console.log("Forecast error " + error.message);
  }
}

// Process Forecast Data
function processForecastData(forecastData) {
  let forecastByDay = {};
  let finalForecast = [];
  forecastData.list.forEach((item) => {
    let date = item.dt_txt.slice(0, 10);
    if (!forecastByDay[date]) {
      forecastByDay[date] = {
        date: date,
        temps: [],
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      };
    }

    forecastByDay[date].temps.push(item.main.temp);
  });
  const dayObjects = Object.values(forecastByDay);
  dayObjects.slice(0, 5).forEach((day) => {
    const temps = day.temps;
    const highTemp = Math.round(Math.max(...temps));
    const lowTemp = Math.round(Math.min(...temps));

    const dayName = getDayName(day.date);

    finalForecast.push({
      day: dayName,
      high: highTemp,
      low: lowTemp,
      condition: day.condition,
      icon: day.icon,
    });
  });

  return finalForecast;
}

// Display Forecast
function displayForecast(forecastArray) {
  const forecastGrid = document.querySelector("#forecast-grid");
  forecastGrid.innerHTML = "";

  forecastArray.forEach((forecast) => {
    const card = createForecastCard(forecast);
    forecastGrid.appendChild(card);
  });
}

// Create Forcast Card
function createForecastCard(forecast) {
  const iconName = getIconName(forecast.condition);
  const cardElement = document.createElement("div");
  cardElement.classList.add("forecast-card", "glass-card");

  cardElement.innerHTML = `
  <span class="forecast-day">${forecast.day}</span>
  <span class="material-symbols-outlined forecast-icon">${iconName}</span>

  <div class="forecast-temps">
    <span class="forecast-high">${forecast.high}</span>
    <span class="forecast=low">${forecast.low}</span>
  </div>`;

  return cardElement;
}

// Get day from date
function getDayName(dateString) {
  const dateObject = new Date(dateString);

  const dayIndex = dateObject.getDay();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return dayNames[dayIndex];
}

// Get icon name for condition
function getIconName(condition) {
  const iconMap = {
    Clear: "wb_sunny",
    Clouds: "cloud",
    Rain: "rainy",
    Drizzle: "grain",
    Thunderstorm: "thunderstorm",
    Snow: "ac_unit",
    Mist: "foggy",
    Fog: "foggy",
    Haze: "foggy",
  };

  return iconMap[condition] || "wb_cloudy";
}
