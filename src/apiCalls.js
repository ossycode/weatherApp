// import {convertWeather} from './utilities'
import {data} from './localStorageManager'
 

const API_KEY = "57002680220e6543bb02bb298d40b6cb"


getFullWeatherData('London')

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
    // console.log(weatherData)

    return forecastData 

}
// Use the city name and generated cords to get all data
export async function getFullWeatherData(currentCity) {
    const requestCordsUrl =  buildRequestCoordUrl(currentCity);

    // get the city coordinates
    const coords = await getCoords(requestCordsUrl)
    
    // Use the filtered city coords to get weather data
    
    const requestforcastUrl =   buildRequestForecastUrl(coords, data.settings.units)
    const weatherData = await getForecast(requestforcastUrl)
    weatherData.name = coords.name;
    weatherData.country = coords.country
    return weatherData;
}



// // Get the coords and city name for a specified city
// async function getData (cityName,  units ) {
//     const responseInitial  =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`)
//     let dataInitial = await responseInitial.json()
//     const {coord} = dataInitial;
//     let lon = coord.lon
//     let lat = coord.lat

//     const responseFollowUp = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=${units}&appid=${API_KEY}`
//     )
    
//     document.querySelector('.error-msg').style.visibility = 'hidden';

//     document.querySelector('.error-msg').style.visibility = 'visible';

// // }
// getData('London')
// async function getData(cityName) {
//     try {

//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
//         let data = await response.json()
//         const {main, name, sys, weather } = data;

//         console.log(data)

//         // console.log ( {main, weather })

//     } catch (err) {
//         console.error(err)
//     }
// }


