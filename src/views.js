import {getFullWeatherData}  from './apiCalls'
import {data} from './localStorageManager'
import {dateFormat, capitaliseString, 
    getTheTimeDifference, getCurrentCityTime ,
    convertTimeFormat, formatTemperature,
    formatUnite,formatToday, formatDistance,
    getSunriseOrSunsetTime, timeFormat} from './utilities'
import {getWeatherIcon} from './weathericons'
import * as domElem from './domCollection'

var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));



// Display current searched city
export async function displayCurrentCity (currentCity) {
   const currentData = await getFullWeatherData(currentCity)
   console.log(currentData)
   const offset = currentData.timezone_offset
   const unixTime = getCurrentCityTime(offset)
   const timeDifferent = getTheTimeDifference(unixTime)
   const time = convertTimeFormat(unixTime, data.settings.clockFormat)
//    setInterval(time, 1000);
  

   let location = `${currentData.name}, ${countries.getName(currentData.country, "en")}`
   let date = dateFormat(unixTime, offset)
   let formatDate =  `${date.dayOfWeek}, ${date.dayOfMonth}${date.dateSuffix} ${date.month} ${date.year}`

   domElem.locationName.textContent = location;
   domElem.currentDecription.textContent = capitaliseString(currentData.current.weather[0].description)
   domElem.footerLocation.textContent = location;
   domElem.currentDay.textContent = date.dayOfWeek
//    formatToday(currentData.current.dt)
   domElem.footerDate.textContent = formatDate
   domElem.currentTime.textContent = time

  
//update time difference in the Current City Card
   if (Math.sign(timeDifferent) === -1) {
       const hrsAhead = Math.abs(timeDifferent) + " hours ahead";
       domElem.timeDifference.textContent = hrsAhead;
   }else if (Math.sign(timeDifferent) === 1){ 
    const hrsBehind = Math.abs(timeDifferent) + " hours behind";
    domElem.timeDifference.textContent = hrsBehind;
   }else if (Math.sign(timeDifferent) === 0) {
        domElem.timeDifference.textContent = "";
   }

   const icon = getWeatherIcon(currentData.current.weather[0].icon);
   domElem.mainDegreeIcon.innerHTML = icon
   domElem.mainDegree.textContent = formatTemperature(currentData.current.temp)
   domElem.degreeUnit.textContent = formatUnite(data.settings.units)
   domElem.currentRealFeel.textContent = formatTemperature(currentData.current.feels_like)
   domElem.currentPressure.textContent = `${currentData.current.pressure}hPa`
   domElem.currentHumidity.textContent = `${currentData.current.humidity}%`
   domElem.currentWind.textContent = formatDistance(currentData.current.wind_speed, data.settings.units)
   domElem.currentSunrise.textContent = timeFormat(currentData.current.sunrise, offset, data.settings.units)
   domElem.currentSunset.textContent = timeFormat(currentData.current.sunset, offset, data.settings.units)
    
  

   

   domElem.footerDegree.textContent =  `${formatTemperature(currentData.current.temp)} ${formatUnite(data.settings.units)}`

   

}


