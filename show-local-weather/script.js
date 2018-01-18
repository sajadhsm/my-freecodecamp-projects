const locationElm = document.querySelector('.location');
const temp = document.querySelector('.temp-value');
const icon = document.querySelector('.icon');
const degree = document.querySelector('.degree');
const refresh = document.querySelector('.ref');
const time = document.querySelector('.time');

// To find the match icon
const wtrOutcome = {
  'Drizzle': 'wi-sprinkle',
  'Clouds': 'wi-cloudy',
  'Rain': 'wi-rain',
  'Snow': 'wi-snow',
  'Clear': 'wi-day-sunny',
  'Thunderstorm': 'wi-thunderstorm',
  'Mist': 'wi-smog',
};

function load() {
  if (navigator.geolocation) {
    getWeatherInfo();
  } else {
    locationElm.innerHTML = 'Your browser does not support Geolocation!';
  }
}

function getWeatherInfo() {
  navigator.geolocation.getCurrentPosition(success, error);
}

function success(position) {
  const lon = position.coords.longitude;
  const lat = position.coords.latitude;

  fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
  .then(response => response.json())
  .then(json => renderInfo(json));
}

function error() {
  locationElm.innerHTML = 'Unable to retrieve your location';
}

function renderInfo(info) {
  const wtr = info.weather[0].main;
  
  locationElm.innerHTML = info.name + ', ' + info.sys.country;
  
  temp.innerHTML = info.main.temp;
  
  degree.classList.add('wi-celsius');
  
  if (wtrOutcome[wtr]) {
    icon.classList.add(wtrOutcome[wtr]);
    icon.title = wtr;
  } else {
    icon.innerHTML = wtr;
  }
  
  time.innerHTML = getClock();
  // Return degree icon to C after refresh
  degree.className = 'degree wi wi-celsius';
}

let degreeUnit = true;

function convertDegree() {
  if (degreeUnit) {
    degree.className = 'degree wi wi-fahrenheit';
    temp.innerHTML = Math.floor(9/5 * Number(temp.innerHTML) + 32);
    degreeUnit = !degreeUnit;
  } else {
    degree.className = 'degree wi wi-celsius';
    temp.innerHTML = Math.ceil(5/9 * (Number(temp.innerHTML) - 32));
    degreeUnit = !degreeUnit;
  }
}

degree.addEventListener('click', convertDegree);

function update() {
  load();
  degreeUnit = true;
}

function getClock() {
  const d = new Date();
  const hh = '0' + d.getHours();
  const mm = '0' + d.getMinutes();
  const ss = '0' + d.getSeconds();
  return `${hh.slice(-2)}:${mm.slice(-2)}:${ss.slice(-2)}`;
}

refresh.addEventListener('click', update);

window.onload = load;