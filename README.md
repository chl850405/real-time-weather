# real-time-weather

## AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## GIVEN a weather dashboard with form inputs

## WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

## WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

* let weatherPic = data.weather[0].icon;

  weatherIconEl.setAttribute("src", " http://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
  weatherIconEl.setAttribute("alt", data.weather[0].description);

  tempValueEl.innerHTML = "Temperature: " + k2f(data.main.temp) + " &#176F";

  humidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";

  windSpeedEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";


## WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

## WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

## WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

    <div id="card" class="col-3 f-card-one>
              <div id="day-one">
                <img id="forecastWeatherIcon" alt="">
                <div id="forecastTemp"></div>
                <div id="forecastWind"></div>
                <div id="forecastHumidity"></div>
              </div>
            </div>

            <div id="card" class="col-3 f-card-two>
              <div id="day-two">
                <img id="forecastWeatherIcon" alt="">
                <div id="forecastTemp"></div>
                <div id="forecastWind"></div>
                <div id="forecastHumidity"></div>
              </div>
            </div>

            <div id="card">
              <div id="day-three class="col-3 f-card-three">
                <img id="forecastWeatherIcon" alt="">
                <div id="forecastTemp"></div>
                <div id="forecastWind"></div>
                <div id="forecastHumidity"></div>
              </div>
            </div>

            <div id="card" class="col-3 f-card-four>
              <div id="day-four">
                <img id="forecastWeatherIcon" alt="">
                <div id="forecastTemp"></div>
                <div id="forecastWind"></div>
                <div id="forecastHumidity"></div>
              </div>
            </div>

            <div id="card" class="col-3 f-card-five>
              <div id="day-five">
                <img id="forecastWeatherIcon" alt="">
                <div id="forecastTemp"></div>
                <div id="forecastWind"></div>
                <div id="forecastHumidity"></div>
              </div>
            </div>