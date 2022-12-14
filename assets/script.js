var button = document.querySelector("#search-button");
var searchInput = document.querySelector(".search-input");
var searchHistory = document.querySelector("history");
var weatherApiKey = "aba22bac1a603ba9277fb78340a99600";
var searchStorage = JSON.parse(localStorage.getItem("history")) || [];
var recentSearches = document.querySelector(".recent");
var container = document.querySelector(".forecast-container");
var cityEl = document.querySelector("#city-date");

button.addEventListener("click", function () {
  var cityValue = searchInput.value;
  console.log(cityValue);
  geoCode(cityValue);
  setStorage(cityValue);
  renderSearchHistory();
});

geoCode(searchStorage[searchStorage.length - 1]);
// function for accessing lat and lon
function geoCode(searchValue) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=aba22bac1a603ba9277fb78340a99600`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      currentWeather(data[0].lat, data[0].lon);
      forecast(data[0].lat, data[0].lon);
    });
}
// Function for current weather
function currentWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=aba22bac1a603ba9277fb78340a99600`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cityEl.textContent =
        data.name + " " + moment(data.dt, "X ").format("MM/DD/YYYY");
      const icon = document.querySelector("#icon");
      icon.setAttribute(
        "src",
        `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
      );
      icon.setAttribute("class", "current");
      var temp = document.querySelector("#temp");
      temp.textContent = "Temperature: " + data.main.temp + "°F";
      var humidity = document.querySelector("#humidity");
      humidity.textContent = "Humidity: " + data.main.humidity + "%";
      var wind = document.querySelector("#wind");
      wind.textContent = "Wind: " + data.wind.speed + "mph";
    });
}

// Function to display the search history list.
function renderSearchHistory() {
  recentSearches.innerHTML = "";

  for (let i = 0; i < searchStorage.length; i++) {
    var button = document.createElement("button");
    button.textContent = searchStorage[i];
    button.setAttribute("class", "historyBtn");
    recentSearches.append(button);
    recentSearches.addEventListener("click", function (event) {
      var cityText = event.target.innerHTML;
      geoCode(cityText);
    });
  }
}

// Function to get search history from local storage.
function initSearchHistory() {
  var storedHistory = localStorage.getItem("history");
  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory);
  }
  renderSearchHistory();
}
// Function to show 5 day forecast.
function forecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=aba22bac1a603ba9277fb78340a99600`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      container.textContent = "";
      for (var i = 4; i < data.list.length; i = i + 8) {
        var date = document.createElement("h5");
        date.textContent = moment(data.list[i].dt, "X ").format("MM/DD/YYYY");
        console.log(data.list[i]);
        var cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card forecastCard");
        var testTemp = document.createElement("p");
        testTemp.textContent = "Temperature " + data.list[i].main.temp + "°F";
        const icon = document.createElement("img");
        icon.setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
        );
        var testHumidity = document.createElement("p");
        testHumidity.textContent =
          "Humidity " + data.list[i].main.humidity + "%";

        var testWind = document.createElement("p");
        testWind.textContent = "Wind " + data.list[i].wind.speed + "mph";
        cardDiv.append(date, icon, testTemp, testHumidity, testWind);
        container.append(cardDiv);
      }
    });
}
// Function to store search history.
function setStorage(history) {
  searchStorage.push(history);
  localStorage.setItem("history", JSON.stringify(searchStorage));
}

renderSearchHistory();