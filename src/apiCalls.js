// import {convertWeather} from './utilities'
import {data} from './localStorageManager'
import {errorSpan} from './domCollection'
 

const API_KEY = "57002680220e6543bb02bb298d40b6cb"



// Generate url with the provided city to get the Coords
 function buildRequestCoordUrl (cityName) {

    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
}

// // Generate ONEAPI request URL  to get the weather data
 function buildRequestForecastUrl(coord, units)  {
return `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=${units}&appid=${API_KEY}`
}

 async function getCoords(url) {

        const response =  await fetch(url);

        if(!response.ok) return;

        const weatherData = await response.json()
        const {coord} = weatherData
        coord.country = weatherData.sys.country
        coord.name = weatherData.name
        return coord
}

// Get the cords and city name for a provided city
 async function getForecast(url) {
        const response =  await fetch(url);
        const forecastData = await response.json()
        return forecastData 
} 

// Use the city name and generated cords to get all data
export async function getFullWeatherData(currentCity) {
    const requestCordsUrl =  buildRequestCoordUrl(currentCity);
    const coords = await getCoords(requestCordsUrl)

    if (coords === undefined) return;

    const requestforcastUrl =  buildRequestForecastUrl(coords, data.settings.units)
    const weatherData = await getForecast(requestforcastUrl)

    // if (weatherData === undefined) return;

    weatherData.name = coords.name;
    weatherData.country = coords.country

    return weatherData;
    // Use the filtered city coords to get weather data
   

}

// export async function name(city) {
//     try {
//         buildRequestCoordUrl(city)
        
//     } catch (error) {
//         errorSpan.textContent = 'city not found';
//         errorSpan.classList.add('animateOut');
//         window.setTimeout(() => errorSpan.classList.remove('animateOut'), 500)
//         throw new Error(error);
//     }
// }

export async function loadUserLocation(coords) {
    const requestforcastUrl =   buildRequestForecastUrl(coords, data.settings.units)
    const weatherData = await getForecast(requestforcastUrl)

   const  response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`)
    const forecastData = await response.json()

    weatherData.country = forecastData.sys.country;
    weatherData.name = forecastData.name
    
    return weatherData;
// const requestforcastUrl =   buildRequestForecastUrl(coords, data.settings.units)
// const weatherData = await getForecast(requestforcastUrl)

// const  response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`)
// const forecastData = await response.json()

// weatherData.country = forecastData.sys.country;
// weatherData.name = forecastData.name

// return weatherData;
}
