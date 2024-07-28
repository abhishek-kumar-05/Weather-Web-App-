// updateTime is use to set time in clock element in (12 hour) format
const updateTime = () => {
  // accessing the orginal time
  const time = new Date();
  let hour = time.getHours(); // hour
  const min = time.getMinutes().toString().padStart(2, "0"); // minute
  const ampm = hour >= 12 ? "PM" : "AM"; // checking wether its am or pm
  // changing the hour into (12 hour) format
  hour = hour % 12;
  hour = hour ? hour : 12;
  const formatedHour = hour.toString().padStart(2, "0");
  // accessing the clock element and updating the content
  let timeVar = document.querySelector(".clock h1");
  timeVar.textContent = `${formatedHour}:${min} ${ampm}`;
};

setInterval(updateTime, 1000); // calling the updateTime function every second

//
// apiKey
const apiKey = "Fyjm0Uz6Qy1lUTT1Eu7BAW4LIcEQFFFI";

// function get exact data about weather using long and lat
async function fetchWeatherData(location) {
  const url = `https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature,temperatureMax,temperatureMin,weatherCode&timesteps=current,1h,1d&units=metric&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    const weatherData = await response.json();

    // fetching current weather details from the weatherData object
    const currentWeather = weatherData.data.timelines[2].intervals[0].values;
    console.log(currentWeather);
    updateUI(currentWeather);
  } catch (error) {
    console.error("Error message during fetching data => ", error);
  }
}

// updating ui by providing data
function updateUI(currentWeather) {
  document.querySelector(".degree-number").textContent =
    currentWeather.temperature;
}

// validateInputField function check wheter the input is empty or not
// if the field is not empty then it do futher process otherwise it will raise a alert
const validateInputField = () => {
  const location = document.getElementById("searchValue").value;
  if (location !== "") {
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
