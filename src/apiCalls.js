// import {convertWeather} from './utilities'
import {saveWeatherDataToLocal} from './localStorageManager'
 

const API_KEY = "57002680220e6543bb02bb298d40b6cb"


// getData('London')

// Generate url with the provided city to get the Coords
export const get = (cityName) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;
}

// // Generate ONEAPI request URL  to get the weather data
export const getCityDetails = (coord, units) => {
return `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely&units=${units}&appid=${API_KEY}`
}

// Get the cords and city name for a provided city
export async function getData(url) {
    const response =  await fetch(url);
    const weatherData = await response.json()

    console.log(weatherData)
    const {coord, main, name, sys, weather, wind } = weatherData
    saveWeatherDataToLocal(weatherData, {coord, main, name, sys, weather, wind})

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


