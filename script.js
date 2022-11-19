var button = document.querySelector ('#search-button');
var searchInput = document.querySelector ('#search-input');
var searchHistory = document.querySelector ('history');
var weatherApiKey = "aba22bac1a603ba9277fb78340a99600";

button.addEventListener('click',function(){
  var cityValue = searchInput.value 
  console.log(cityValue);
  geoCode (cityValue)
}) 

function geoCode (searchValue) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=aba22bac1a603ba9277fb78340a99600`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      currentWeather (data[0].lat, data[0].lon)
      forecast(data[0].lat, data[0].lon);
    });
}

function currentWeather(lat,lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=aba22bac1a603ba9277fb78340a99600`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

    var temp = $('<h2>').text('Tempature: '+ data.main.temp )
    var humidity = document.createElement('h2')
      humidity.textContent= 'Humidity: ' + data.main.humidity;
    var wind = $('<h2>').text('Wind: '+ data.wind.speed )



    $('#current-weather').append(temp, humidity,wind)
    });
}

// Function to display the search history list.
function renderSearchHistory() {
  searchHistory.innerHTML = '';
}

// Function to get search history from local storage.
function initSearchHistory() {
  var storedHistory = localStorage.getItem('history');
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
      for (var i=4; i<data.list.length; i=i+8) {
        console.log(data.list[i]);

        var forecastTemp = $('<p>').text('Tempature: ' + data.list[i].main.temp) 
        var forecastHumidity = $('<p>').text('Humidity: ' + data.list[i].main.humidity)
        var forecastWind = $('<p>').text('Wind: '+ data.list[i].wind.speed)


        $('#forecast').append(forecastTemp, forecastHumidity, forecastWind)
      }
    });
}
// Function to store search history.


