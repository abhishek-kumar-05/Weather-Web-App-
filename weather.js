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
