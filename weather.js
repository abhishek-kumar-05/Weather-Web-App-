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

// validateInputField function check wheter the input is empty or not
// if the field is not empty then it do futher process otherwise it will raise a alert
const validateInputField = () => {
  const location = document.getElementById("searchValue").value;
  if (location !== "") {
    document.getElementById("searchValue").value = "";
    console.log(location);
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

//
