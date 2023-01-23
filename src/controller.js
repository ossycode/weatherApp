import * as domElem from './domCollection'
import {getFullWeatherData} from './apiCalls'
import {data} from './localStorageManager'
import {displayCurrentCity} from './views'
import * as utils from './utilities'



window.addEventListener('load', () => {
    displayCurrentCity(data.currentCity.city)
})


domElem.forcastAirqualitySwitch.addEventListener('change', function() {
    if (this.checked) {
        domElem.forcastAirqualitySwitchLabel.style.color = "white"
        document.documentElement.style.setProperty('--afterColor',  'black')

    }else{
        domElem.forcastAirqualitySwitchLabel.style.color = "black"
        document.documentElement.style.setProperty('--afterColor',  'white')
    }
})

// document.addEventListener('load', (e) => {
//     let currentCity = data.currentCity.city
// })



// let reloadUnit = false
// let currentCity = 'london';







 