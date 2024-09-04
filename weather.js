import { updateTime, changeTimeFormat } from "./time.js";
import { updateUI } from "./updateui.js";

setInterval(updateTime, 1000); // calling the updateTime function every second

// apiKey
const apiKey = "Add you api key";

// function get exact data about weather using long and lat
async function fetchWeatherData(location) {
  const url = `https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature,temperatureMax,temperatureMin,weatherCode,sunriseTime,sunsetTime&timesteps=current,1h,1d&units=metric&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    const weatherData = await response.json();

    // fetching current weather details from the weatherData object
    const currentWeather = weatherData.data.timelines[2].intervals[0].values;
    const nextHourWeather = weatherData.data.timelines[1].intervals;
    const dailyForecast = weatherData.data.timelines[0].intervals;

    const now = new Date();
    const startTime = new Date(now.getTime() + 0.5 * 60 * 60 * 1000);
    const endTime = new Date(now.getTime() + 13 * 60 * 60 * 1000);

    const toIST = (date) => {
      const utcOffset = 5.5 * 60 * 60 * 1000;
      return new Date(date.getTime() + utcOffset);
    };

    const next12HourTemp = nextHourWeather.filter((element) => {
      const timeUTC = new Date(element.startTime);

      element.startTime = timeUTC;

      return timeUTC > startTime && timeUTC <= endTime;
    });

    updateUI(currentWeather, next12HourTemp, dailyForecast);
  } catch (error) {
    console.error("Error message during fetching data => ", error.code);
  }
}

// validateInputField function check wheter the input is empty or not
// if the field is not empty then it do futher process otherwise it will raise a alert
const validateInputField = () => {
  const location = document.getElementById("searchValue").value;
  if (location !== "") {
    document.querySelector(".locName").textContent =
      location.substring(0, 1).toUpperCase() + location.substring(1);
    document.getElementById("searchValue").value = "";
    const encodedLocation = encodeURIComponent(location);
    fetchWeatherData(encodedLocation);
  } else {
    alert("Enter the location value");
  }
};

// getting button element and adding eventlistner
const button = document.querySelector(".search-button");
button.addEventListener("click", function () {
  validateInputField();
});
// getting input field element and adding eventlistner
const inputField = document.getElementById("searchValue");
inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") validateInputField();
});
