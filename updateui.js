import { changeTimeFormat } from "./time.js";

// updating ui by providing data
export function updateUI(currentWeather, nextHourWeather) {
  document.querySelector(".degree-number").textContent = Math.round(
    currentWeather.temperature
  );

  const cardContainer = document.querySelector(".card-container");

  // clearing previous card container element
  cardContainer.innerHTML = "";

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
}
