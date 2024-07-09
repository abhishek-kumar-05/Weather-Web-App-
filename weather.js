document
  .querySelector(".searchBar button")
  .addEventListener("click", function () {
    const place = document.getElementById("searchValue").value;
    fetchWeather(place);
  });
