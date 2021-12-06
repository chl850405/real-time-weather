//search variables
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var searchCityBtnEl = document.querySelector("#submit")
var weatherContainerEl = document.querySelector("#weather-container")

//current weather variables
var currentCityEl = document.querySelector(".currentCity")
var weatherIconEl = document.getElementById("weather-icon")
var tempValueEl = document.getElementById("temp")
var windSpeedEl = document.getElementById("wind")
var humidityEl = document.getElementById("humidity")
var uvIndexEl = document.getElementById("uv-index")

//forecast variables
var fiveDayForecastEl = document.getElementById("fiveDayForecast")
var forecastWeatherIconEl = document.getElementById("forecastWeatherIcon")
var forecastTempValueEl = document.getElementById("forecastTemp")
var forecastWindSpeedEl = document.getElementById("forecastWind")
var forecastHumidityEl = document.getElementById("forecastHumidity")

var key = "fbc29f5f6fe6308bdd370da37c3955a4";



var now = moment();

$("#currentDate").text(moment().format("L"));
$("#day-one").text(moment(now).add(1 , 'day').format("L"));
$("#day-two" ).text(moment().add(2 , 'day').format("L"));
$("#day-three").text(moment().add(3 , 'day').format("L"));
$("#day-four").text(moment().add(4 , 'day').format("L"));
$("#day-five").text(moment().add(5 , 'day').format("L"));


var formSubmitHandler = function(event) {
  //prevent page from refreshing
    event.preventDefault();
    //get value
    var city = cityInputEl.value.trim();

    if(city) {
      getSearchedWeather(city);

    }else {
      alert("Please enter city name");
    }
  };

var buttonClickHandler = function(searchCity) {
  // get the language attribute from the clicked element
  var searchCity = city.target.getAttribute("data-weather");

  if (weather) {
    getSearchedWeather(searchedCity)
    // clear old content
    weatherContainerEl.textContent = "";
  }
};

// search a city's weather
var getSearchedWeather = function(city) {
  //temperal literal
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fbc29f5f6fe6308bdd370da37c3955a4`;

  console.log(apiUrl);

  fetch(apiUrl)
  .then(function(response) {
    let data = response.json();
    return data;
  })
  //display current weather conditions
  .then(function(data) {
  console.log(data);

  currentCityEl.innerHTML = data.name + moment().format("L");

  let weatherPic = data.weather[0].icon;

  weatherIconEl.setAttribute("src", " http://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
  weatherIconEl.setAttribute("alt", data.weather[0].description);

  tempValueEl.innerHTML = "Temperature: " + k2f(data.main.temp) + " &#176F";

  humidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";

  windSpeedEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";

  })
  .catch(err => {
    console.log(err);
  });
}

//five day forecast
var getFiveDayForecast = function(city) {
  //temperal literal
  let forecastUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fbc29f5f6fe6308bdd370da37c3955a4`;

  console.log(forecastUrl);

  axios.get(forecastUrl)
  .then(function(response) {
    fiveDayForecastEl.classList.remove("d-none") 

  let weatherPic = response.data.weather[0].icon;

  forecastWeatherIconEl.setAttribute("src", " http://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
  forecastWeatherIconEl.setAttribute("alt", response.data.weather[0].description);

  forecastTempValueEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";

  forecastHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";

  forecastWindSpeedEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

  })
  .catch(err => {
    console.log(err);
  })
}

function k2f(K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
}

userFormEl.addEventListener("submit", formSubmitHandler);