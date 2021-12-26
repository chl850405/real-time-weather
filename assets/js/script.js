//search variables
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var searchCityBtnEl = document.querySelector("#submit")
var weatherContainerEl = document.querySelector("#weather-container")
const clearEl = document.getElementById("clear-history");

//current weather variables
var currentCityEl = document.querySelector(".currentCity")
var weatherIconEl = document.getElementById("weather-icon")
var tempValueEl = document.getElementById("temp")
var windSpeedEl = document.getElementById("wind")
var humidityEl = document.getElementById("humidity")
var uvIndexEl = document.getElementById("uv-index")

var key = "fbc29f5f6fe6308bdd370da37c3955a4";

var searchHistory = [];

var now = moment();

$("#currentDate").text(moment().format("L"));
$("#day-one").text(moment(now).add(1 , 'day').format("L"));
$("#day-two" ).text(moment().add(2 , 'day').format("L"));
$("#day-three").text(moment().add(3 , 'day').format("L"));
$("#day-four").text(moment().add(4 , 'day').format("L"));
$("#day-five").text(moment().add(5 , 'day').format("L"));

// Forloop for persisting the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {

  var city = localStorage.getItem(i);
  // console.log(localStorage.getItem("City"));
  var cityName = $(".weather-container").addClass("weather-contianer-item");

  cityName.append("<li>" + city + "</li>");
}


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

// Function to obtain the five day forecast and display to HTML
var getFiveDayForecast = (event) => {
  let city = $('#city').val();
  // Set up URL for API search using forecast search
  let queryURL = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fbc29f5f6fe6308bdd370da37c3955a4`;
  // Fetch from API
  fetch(queryURL)
      .then (handleErrors)
      .then((response) => {
          return response.json();
      })
      .then((response) => {
      // HTML template
      let fiveDayForecastHTML = `
      <div id="fiveDayForecastUl" class="d-inline-flex flex-wrap ">`;
      // Loop over the 5 day forecast and build the template HTML using UTC offset and Open Weather Map icon
      for (let i = 0; i < response.list.length; i++) {
          let dayData = response.list[i];
          let dayTimeUTC = dayData.dt;
          let timeZoneOffset = response.city.timezone;
          let timeZoneOffsetHours = timeZoneOffset / 60 / 60;
          let thisMoment = moment.unix(dayTimeUTC).utc().utcOffset(timeZoneOffsetHours);
          let weatherPic = data.weather[0].icon;

          weatherIconEl.setAttribute("src", " http://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
          weatherIconEl.setAttribute("alt", data.weather[0].description);
          // Only displaying mid-day forecasts
          if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
              fiveDayForecastHTML += `
              <div class="weather-card card m-2 p0">
                  <ul class="list-unstyled p-3">
                      <li>${thisMoment.format("MM/DD/YY")}</li>
                      <li class="weather-icon"><img src="${iconURL}"></li>
                      <li>Temp: ${dayData.main.temp}&#8457;</li>
                      <br>
                      <li>Humidity: ${dayData.main.humidity}%</li>
                  </ul>
              </div>`;
          }
      }
      // Build the HTML template
      fiveDayForecastHTML += `</div>`;
      // Append the five-day forecast to the DOM
      $('#five-day-forecast').html(fiveDayForecastHTML);
  })
  console.log(event);
}

function k2f(K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
}

searchCityBtnEl.addEventListener("click",function() {
  const searchTerm = cityInputEl.value;
  searchHistory.push(searchTerm);
  localStorage.setItem("search",JSON.stringify(searchHistory));
})

clearEl.addEventListener("click",function() {
  searchHistory = [];
  getSearchedWeather()
})

$(document).ready(function() {
  var searchHistoryArr = JSON.parse(localStorage.getItem("city"));

  if (searchHistoryArr !== null) {
      var lastSearchedIndex = searchHistoryArr.length - 1;
      var lastSearchedCity = searchHistoryArr[lastSearchedIndex];
      currentCondition(lastSearchedCity);
      console.log(`Last searched city: ${lastSearchedCity}`);
  }
});

userFormEl.addEventListener("submit", formSubmitHandler);