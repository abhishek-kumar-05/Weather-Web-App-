import { changeTimeFormat } from "./time.js";

// updating ui by providing data
export function updateUI(currentWeather, nextHourWeather, dailyForecast) {
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

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="future-weather-time">
                  <span>${formatedHour}</span> <span>${ampm}</span>
                </div>
                <div class="future-weather-pic">
                  <img src="assets/haze.png" alt="haze photo" loading="lazy" />
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
    const [day, date, tempmax, tempmin] = dailyForecastDetails(element);
    const card = document.createElement("div");
    card.classList.add("dailyforecast-card");
    card.innerHTML = `<div class="dailyforecast-content">
                <span class="dailyforecast-date">${day} ${date}</span>
                <span class="dailyforecast-weather-icon"
                  ><img src="assets/haze.png" alt="weather icon"
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

  const dateObject = new Date(startTime);
  const date = dateObject.getUTCDate();
  const dayIndex = dateObject.getUTCDay();
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = dayOfWeek[dayIndex];

  return [dayName, date, tempMax, tempMin];
}
