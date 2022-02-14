// *** API geolocation call ***

navigator.geolocation.getCurrentPosition(showCurrentPosition);

function showCurrentPosition(position) {
  console.log(position, "show position");
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d501ce4c88c1a995f848c610a71cfad4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;

  axios.get(apiUrl).then(function (response) {
    document.querySelector("#heading").innerHTML = response.data.name;

    treatResponse(response);
    //showEmotion(response);
  });
}

let btnCurrentLocation = document.querySelector(".location");
btnCurrentLocation.addEventListener("click", showPosition);

// botao para pegar a localiZaçao atual
function showPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

//Chamada a API quando o usuario define a localizaçao

function searchLocaltion(e) {
  e.preventDefault();

  let apiKey = "d501ce4c88c1a995f848c610a71cfad4";

  let inputCity = document.querySelector("#inputCity");
  console.log(inputCity.value);
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&&units=metric`;
  heading.innerHTML = inputCity.value;

  axios.get(apiUrlCity).then(function (response) {
    treatResponse(response);
    //showEmotion(response);
  });
}

let searchCity = document.querySelector("#form");
searchCity.addEventListener("submit", searchLocaltion);
let heading = document.querySelector("#heading");

let dateNow = moment().format(" ddd - MMM Do YYYY, h:mm a");

let text = document.querySelector("#date-today");
text.innerHTML = dateNow;

function getForecast(coordinates) {
  console.log(coordinates, " resposta coords");
  let apiKey = "d501ce4c88c1a995f848c610a71cfad4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// essa funçao é pq ela aparece em varias funcoes.  é aqui que eu mudo os textos de acordo com a API
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

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = response.data.main.humidity;

  let precipitation = document.querySelector(".precipitation");
  precipitation.innerHTML = response.data.precipitation;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

//Funçao ainda no mock para mostarr temperatura em celcius e fahenreit

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

let celciusUnit = document.querySelector("#celsius");
celciusUnit.addEventListener("click", showCelcius);

// function showEmotion(response) {
//   let weatherRes = response.data.weather[0].main;
//   let weatherEmoji = document.querySelector("#emoji");

//   console.log(weatherRes, "resposta do tempo");

//   if (weatherRes == "Clouds") {
//     weatherEmoji.appendChild(document.createElement("img")).src =
//       "src/assets/cloud2.gif";
//   } else if (weatherRes == "Snow") {
//     weatherEmoji.appendChild(document.createElement("img")).src =
//       "src/assets/snoww.gif";
//   } else if (weatherRes == "Sky" || weatherRes == "Clear") {
//     weatherEmoji.appendChild(document.createElement("img")).src =
//       "src/assets/sol.gif";
//   } else if (weatherRes == "Rain") {
//     weatherEmoji.appendChild(document.createElement("img")).src =
//       "src/assets/rain1.png";
//   } else {
//     weatherEmoji.appendChild(document.createElement("h1")).src = "deu ruim";
//   }
// }

//displayForecast();
