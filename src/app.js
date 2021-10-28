function searchLocaltion(e) {
  e.preventDefault();
  let inputCity = document.querySelector("#inputCity");
  heading.textContent = inputCity.value;
}
let searchCity = document.querySelector("#form");
searchCity.addEventListener("submit", searchLocaltion);
let heading = document.querySelector("#heading");

let dateNow = moment().format(" ddd - MMM Do YYYY, h:mm a");

let text = document.querySelector("#date-today");
text.innerHTML = dateNow;

function showFahrenheit() {
  let tempFah = document.querySelector("#temperature-change");
  tempFah.innerHTML = " 66°F";
}
let fahrenheitUnit = document.querySelector("#fahrenheit");
fahrenheitUnit.addEventListener("click", showFahrenheit);

function showCelcius() {
  let tempCel = document.querySelector("#temperature-change");
  tempCel.innerHTML = " 16°C";
}

let celciusUnit = document.querySelector("#celcius");
celciusUnit.addEventListener("click", showCelcius);
