// *** API geolocation call ***

navigator.geolocation.getCurrentPosition(showCurrentPosition);

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d501ce4c88c1a995f848c610a71cfad4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;

  axios.get(apiUrl).then(function (response) {
    document.querySelector("#heading").innerHTML = response.data.name;

    treatResponse(response);
  });
}

let btnCurrentLocation = document.querySelector(".location");
btnCurrentLocation.addEventListener("click", showPosition);

// botao para pegar a localiZaçao atual
function showPosition() {
  console.log("clicou");
}

function searchLocaltion(e) {
  e.preventDefault();

  let apiKey = "d501ce4c88c1a995f848c610a71cfad4";

  let inputCity = document.querySelector("#inputCity");
  console.log(inputCity.value);
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&&units=metric`;
  heading.innerHTML = inputCity.value;

  axios.get(apiUrlCity).then(function (response) {
    treatResponse(response);
  });
}

let searchCity = document.querySelector("#form");
searchCity.addEventListener("submit", searchLocaltion);
let heading = document.querySelector("#heading");

let dateNow = moment().format(" ddd - MMM Do YYYY, h:mm a");

let text = document.querySelector("#date-today");
text.innerHTML = dateNow;

function treatResponse(response) {
  let temperature = document.querySelector("#temperature-change");
  temperature.innerHTML = Math.floor(response.data.main.temp);

  let weatherDescription = document.querySelector(".weather-text");
  weatherDescription.innerHTML = response.data.weather[0].main;

  let tempMin = document.querySelector(".temp-min");
  tempMin.innerHTML = Math.floor(response.data.main.temp_min);

  let tempMax = document.querySelector(".temp-max");
  tempMax.innerHTML = Math.floor(response.data.main.temp_max);

  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = Math.floor(response.data.main.feels_like);
}

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
