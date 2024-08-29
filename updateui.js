import { changeTimeFormat } from "./time.js";
import { weatherIconCode } from "./weathercode.js";

// updating ui by providing data
export function updateUI(currentWeather, nextHourWeather, dailyForecast) {
  const [weatherName, iconSrc] = weatherIcon(currentWeather.weatherCode);
  document.querySelector(".current-weather-img-container>img").src = iconSrc;
  document.querySelector(".textual-detail").textContent = weatherName;

  document.querySelector(".degree-number").textContent = Math.round(
    currentWeather.temperature
  );

  const cardContainer = document.querySelector(".card-container");
  const dailyForecastContainer = document.querySelector(
    ".dailyforecast-container"
  );

  // clearing previous card container element
  cardContainer.innerHTML = "";
  dailyForecastContainer.innerHTML = "";

  nextHourWeather.forEach((element) => {
    const timeUTC = new Date(element.startTime);
    const localTime = timeUTC.toLocaleTimeString([], { hour: "2-digit" });

    const [formatedHour, ampm] = changeTimeFormat(localTime);
    const [weatherName, iconSrc] = weatherIcon(element.values.weatherCode);
  
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="future-weather-time">
                  <span>${formatedHour}</span> <span>${ampm}</span>
                </div>
                <div class="future-weather-pic">
                  <img src=${iconSrc} alt=${weatherName} loading="lazy" />
                </div>
                <div class="future-weather-temp">
                  <span>${Math.round(
                    element.values.temperatureMax
                  )}°</span><span>${Math.round(
      element.values.temperatureMin
    )}°</span>
                </div>`;
    cardContainer.appendChild(card);
  });

  dailyForecast.forEach((element) => {
    const [dayDate, tempmax, tempmin, weatherCode] =
      dailyForecastDetails(element);
    const [weatherName, iconSrc] = weatherIcon(weatherCode);
    const card = document.createElement("div");
    card.classList.add("dailyforecast-card");
    card.innerHTML = `<div class="dailyforecast-content">
                <span class="dailyforecast-date">${dayDate}</span>
                <span class="dailyforecast-weather-icon"
                  ><img src=${iconSrc} alt=${weatherName}
                /></span>
                <span class="dailyforecast-weather-detail">${tempmax}° / ${tempmin}°</span>
              </div>`;
    dailyForecastContainer.appendChild(card);
  });
}

function dailyForecastDetails(element) {
  const startTime = element.startTime;
  const tempMax = Math.round(element.values.temperatureMax);
  const tempMin = Math.round(element.values.temperatureMin);
  const weatherCode = element.values.weatherCode;

  const dateObject = new Date(startTime);
  const date = dateObject.getUTCDate();
  const dayIndex = dateObject.getUTCDay();
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = dayOfWeek[dayIndex];

  const getTodayDate = () => {
    const today = new Date();
    const day = dayOfWeek[today.getDay()];
    const date = today.getDate();
    return `${day} ${date}`;
  };

  const today = getTodayDate();
  let dayDate = "";
  if (today === `${dayName} ${date}`) {
    dayDate = "Today ";
  } else {
    dayDate = `${dayName} ${date}`;
  }

  return [dayDate, tempMax, tempMin, weatherCode];
}

function weatherIcon(iconCode) {
  if (weatherIconCode.hasOwnProperty(iconCode)) {
    return [weatherIconCode[iconCode].name, weatherIconCode[iconCode].src];
  } else {
    console.log("weather code not found");
  }
}
