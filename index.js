// Get latitude & longitude from city name (FREE)
async function getCoordinates(city) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    const response = await fetch(geoUrl);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        alert("City not found");
        return null;
    }

    return {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude
    };
}

// Get weather data
async function getWeather(city) {
    cityName.innerHTML = city;

    const coords = await getCoordinates(city);
    if (!coords) return;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const weather = data.current_weather;

            temp.innerHTML = weather.temperature;
            temp2.innerHTML = weather.temperature;
            feels_like.innerHTML = weather.temperature;

            wind_speed.innerHTML = weather.windspeed;
            wind_speed2.innerHTML = weather.windspeed;
            wind_degrees.innerHTML = weather.winddirection;

            humidity.innerHTML = data.hourly.relativehumidity_2m[0];
            humidity2.innerHTML = data.hourly.relativehumidity_2m[0];

            min_temp.innerHTML = data.daily.temperature_2m_min[0];
            max_temp.innerHTML = data.daily.temperature_2m_max[0];

            sunrise.innerHTML = new Date(data.daily.sunrise[0]).toLocaleTimeString();
            sunset.innerHTML = new Date(data.daily.sunset[0]).toLocaleTimeString();
        })
        .catch(err => console.error(err));
}

// Button click
submit.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(city.value);
});

// Default city
getWeather("Delhi");

// Common cities table
async function loadCityWeather(city, tempEl, humidityEl, windEl) {
    const coords = await getCoordinates(city);
    if (!coords) return;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=relativehumidity_2m&timezone=auto`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            tempEl.innerHTML = data.current_weather.temperature;
            windEl.innerHTML = data.current_weather.windspeed;
            humidityEl.innerHTML = data.hourly.relativehumidity_2m[0];
        })
        .catch(err => console.error(err));
}

// Load common cities
loadCityWeather("Patna", temp3, humidity3, wind_speed3);
loadCityWeather("Lucknow", temp4, humidity4, wind_speed4);
loadCityWeather("Kolkata", temp5, humidity5, wind_speed5);
loadCityWeather("Chennai", temp6, humidity6, wind_speed6);