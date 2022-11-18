var button = document.querySelector ('button');
var name = document.querySelector ('name');
var description = document.querySelector ('description');
var tempature = document.querySelector ('tempature');
var searchHistory = document.querySelector ('history');

var weatherApiRootUrl = "https://api.openweathermap.org";
var weatherApiKey = "aba22bac1a603ba9277fb78340a99600";


// fetch ('https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=')


// Function to display the search history list.
function renderSearchHistory() {
  searchHistory.innerHTML = '';
}

// Function to get search history from local storage
function initSearchHistory() {
  var storedHistory = localStorage.getItem('history');
  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory);
  }
  renderSearchHistory();
}
// Function to show 5 day forecast.


// Function to store search history


// day.js for current date and time?


// Call parameters to present the city name, date, an icon representation of weather conditions,temperature,humidity and wind speed

