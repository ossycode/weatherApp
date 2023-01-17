import {convertWeather} from './utilities'

const API_KEY = "57002680220e6543bb02bb298d40b6cb"


getData('London')

export async function getData(cityName) {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        let data = await response.json()
        const {main, name, sys, weather } = data;

        convertWeather(data)

        console.log ( {main, weather })

    } catch (err) {
        console.error(err)
    }
}


