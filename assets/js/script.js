//search variables
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var searchCityBtnEl = document.querySelector("#submit");
var weatherContainerEl = document.querySelector("#weather-container");
var clearEl = document.querySelector("#clear");

//current weather variables
var currentCityEl = document.querySelector(".currentCity");
var weatherIconEl = document.getElementById("weather-icon");
var tempValueEl = document.getElementById("temp");
var windSpeedEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvIndexEl = document.getElementById("uv-index");
var forecastEl = document.getElementById("fiveDayForecast");
var forecastContainerEl = document.getElementById("card");


// Error handler for fetch, trying to mimic the AJAX .fail command: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
var handleErrors = (response) => {
  return response;
};

var key = "fbc29f5f6fe6308bdd370da37c3955a4";

var lastCity = "";

var searchHistory = [];

var now = moment();

$("#currentDate").text(moment().format("L"));

var formSubmitHandler = function (event) {
  //prevent page from refreshing
  event.preventDefault();
  //get value
  var city = cityInputEl.value.trim();

  if (city) {
    getSearchedWeather(city);
  } else {
    alert("Please enter city name");
  }
};

var buttonClickHandler = function (searchedCity) {
  // get the language attribute from the clicked element
  var searchedCity = city.target.getAttribute("data-weather");

  if (weather) {
    getSearchedWeather(searchedCity);
    // clear old content
    weatherContainerEl.textContent = "";
  }
};

// search a city's weather
var getSearchedWeather = function (city) {
  //temperal literal
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

  console.log(apiUrl);

  fetch(apiUrl)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    //display current weather conditions
    .then(function (data) {
      console.log(data);

      currentCityEl.innerHTML = data.name + moment().format("L");

      let weatherPic = data.weather[0].icon;

      weatherIconEl.setAttribute(
        "src",
        " http://openweathermap.org/img/wn/" + weatherPic + "@2x.png"
      );
      weatherIconEl.setAttribute("alt", data.weather[0].description);

      tempValueEl.innerHTML = "Temperature: " + k2f(data.main.temp) + " &#176F";

      humidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";

      windSpeedEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      getUvIndex(lat, lon);
    })
    .catch((err) => {
      console.log(err);
    });
  getForecast(city)
  saveCity(city);
  renderCities()
}

var getUvIndex = function (lat, lon) {
  var apiKey = "844421298d794574c100e3409cee0499";
  var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayUvIndex(data);
    });
  });
};

var displayUvIndex = function (index) {
  var uvIndexEl = document.createElement("div");
  uvIndexEl.textContent = "UV Index: ";

  uvIndexValue = document.createElement("span");
  uvIndexValue.textContent = index.value;

  if (index.value <= 2) {
    uvIndexValue.classList = "favorable";
  } else if (index.value > 2 && index.value <= 8) {
    uvIndexValue.classList = "moderate ";
  } else if (index.value > 8) {
    uvIndexValue.classList = "severe";
  }

  uvIndexEl.appendChild(uvIndexValue);

  //append index to current weather
  weatherContainerEl.appendChild(uvIndexEl);
};

var getForecast = function (city) {
  console.log("hey", city)
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;

  fetch(apiURL)
  .then(function (response) {
      response.json()
    .then(function (data) {
      console.log("hey", data)
      displayForecast(data.list)
    })
  })
// };

var displayForecast = function (weather) {

  // console.log(weather)

  for (var i = 0; i < weather.length; i = i + 8) {
    let data = weather
    forecastContainerEl = ""
    dailyForecast = [i]
   

    // console.log(weather)

    let forecastContainer= document.createElement("div")

    let forecastDateEl = document.createElement("p");
    forecastDateEl.innerHTML = (moment(now).add(1 , "day").format("L"));
    forecastContainer.appendChild(forecastDateEl);

    let weather_img = document.createElement("img") 
    weather_img.setAttribute("src", "http://openweathermap.org/img/wn/" + dailyForecast + "@2x.png")
    weather_img.setAttribute("alt", weather[0].description);
    forecastContainer.prepend(weather_img);
    console.log(weather_img);

    let tempContainer = document.createElement("p")
    tempContainer.innerHTML = "Temperature: " + k2f(weather[i].main.temp) + " &#176F";
    forecastContainer.appendChild(tempContainer)
    console.log(temp);

    let humidityContainer = document.createElement("p")
    humidityContainer.innerHTML = "Humidity: " + weather[i].main.humidity + "%";
    forecastContainer.appendChild(humidityContainer)
    console.log(humidity);

    let windContainer = document.createElement("p")
    windContainer.innerHTML = "Wind Speed: " + weather[i].wind.speed + " MPH";
    forecastContainer.appendChild(windContainer)
    console.log(forecastContainer)
    forecastEl.appendChild(forecastContainer)
    console.log(forecastEl);
  }
}
};
// Function to save the city to localStorage
var saveCity = (newCity) => {
  let cityExists = false;
  // Check if City exists in local storage
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage["cities" + i] === newCity) {
      cityExists = true;
      break;
    }
  }
  // Save to localStorage if city is new
  if (cityExists === false) {
    localStorage.setItem("cities" + localStorage.length, newCity);
  }
};
// Render the list of searched cities
var renderCities = () => {
  $("#city-results").empty();
  // If localStorage is empty
  if (localStorage.length === 0) {
    if (lastCity) {
      $("#city").attr("value", lastCity);
    }
  } else {
    // Build key of last city written to localStorage
    let lastCityKey = "cities" + (localStorage.length);
    lastCity = localStorage.getItem(lastCityKey);
    // Set search input to last city searched
    $("#city").attr("value", lastCity);
    // Append stored cities to page
    for (let i = 0; i < localStorage.length; i++) {
      let city = localStorage.getItem("cities" + i);
      let cityEl;
      // Set to lastCity if currentCity not set
      if (city === "") {
        city = lastCity;
      }
      // Set button class to active for currentCity
      if (city === city) {
        cityEl = `<button type="button" class="list-group-item list-group-item-action active">${city}</button></li>`;
        // }
        // Append city to page
        $("#city-results").prepend(cityEl);
      }
    }
  }
};

function k2f(K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
}

searchCityBtnEl.addEventListener("click", function () {
  const searchTerm = cityInputEl.value;
  searchHistory.push(searchTerm);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  saveCity()
});

userFormEl.addEventListener("submit", formSubmitHandler);

// Clear old searched cities
clearEl.addEventListener("click", function () {
  localStorage.clear(), renderCities();
});