import * as domElem from './domCollection'
import {loadUserLocation, getFullWeatherData} from './apiCalls'
import {data} from './localStorageManager'
import {displayCurrentCity, displayDailyWeather, displayBigCitiesWeather} from './views'
import {fahrenheitToCelsius, celsiusToFahrenheit} from './utilities'
import {saveWeatherDataToLocal} from './localStorageManager'



(async function () {
    // const currentData = await getFullWeatherData(data.currentCity.city)
    // displayCurrentCity(currentData)
    // displayDailyWeather(currentData)
    // displayBigCitiesWeather(data.bigCities)

    // getLocation()
    if (data.userLocation.city === '' ){
        const currentData = await getFullWeatherData(data.currentCity.city)
        displayCurrentCity(currentData)
        displayDailyWeather(currentData)
        displayBigCitiesWeather(data.bigCities)
        getLocation()
    }else {
        const currentData = await getFullWeatherData(data.userLocation.city)
        displayCurrentCity(currentData)
       displayDailyWeather(currentData)
       displayBigCitiesWeather(data.bigCities)
    }

  })();



  domElem.searchInput.addEventListener('search', async (e) => {
    e.preventDefault()
    // console.log(e.target.value)
    if (e.target.value === '' ){
        domElem.errorSpan.classList.add('animateOut');
        domElem.errorSpan.textContent = 'city not found';
        window.setTimeout(() => domElem.errorSpan.classList.remove('animateOut'), 500000)

    }else{
        const currentData = await getFullWeatherData(e.target.value)
       if (currentData === undefined) {
        domElem.errorSpan.textContent = 'city not found';
        domElem.errorSpan.classList.add('animateOut');
        window.setTimeout(() => domElem.errorSpan.classList.remove('animateOut'), 500000)
        domElem.searchInput.value = ''
        return;
        }
        displayCurrentCity(currentData)
        displayDailyWeather(currentData)
        domElem.searchInput.value = ''
     
          
    };
})

domElem.forcastAirqualitySwitch.addEventListener('change', (e) => {
    const alltemperatures = document.querySelectorAll('.temperature');
    if (e.target.checked) {
        alltemperatures.forEach(temp => {
        temp.textContent = celsiusToFahrenheit(parseInt(temp.textContent))+ "°F"
        })
        // console.log("Checkbox is checked..");
      } else {
        alltemperatures.forEach(temp => {
            temp.textContent = fahrenheitToCelsius(parseInt(temp.textContent))+ "°C"
            // console.log("Checkbox is not checked..");
            })
      }
})

// async function controlDataUI(searchCity) {
//     try {
//         const currentData = await getFullWeatherData(searchCity)
//           displayCurrentCity(currentData)
//           displayDailyWeather(currentData)
//     } catch (error) {
//         domElem.errorSpan.textContent = 'city not found';
//         domElem.errorSpan.classList.add('animateOut');
//         window.setTimeout(() => domElem.errorSpan.classList.remove('animateOut'), 500)
//         throw new Error(error);
//     }
//     }


domElem.forcastAirqualitySwitch.addEventListener('change', function() {
    if (this.checked) {
        domElem.forcastAirqualitySwitchLabel.style.color = "white"
        document.documentElement.style.setProperty('--afterColor',  'black')

    }else{
        domElem.forcastAirqualitySwitchLabel.style.color = "black"
        document.documentElement.style.setProperty('--afterColor',  'white')
    }
})



function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    return;
  }
}



async function showPosition(position) {
  let lat =  position.coords.latitude 
  let lon =  position.coords.longitude
  const coords = {lat, lon}
  const currentData = await loadUserLocation(coords)
  displayCurrentCity(currentData)
  displayDailyWeather(currentData)
//   saveWeatherDataToLocal(data.userLocation.city, currentData.name)
  saveWeatherDataToLocal('userCity',   currentData.name)
  saveWeatherDataToLocal('userCoords',  coords)

}