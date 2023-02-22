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
export function displayCurrentCity (currentData) {
   // const currentData = await getFullWeatherData(currentCity)
   const offset = currentData.timezone_offset
   const unixTime = getCurrentCityTime(offset)
   const timeDifferent = getTheTimeDifference(unixTime)
   const time = convertTimeFormat(unixTime, data.settings.clockFormat)
  

   let location = `${currentData.name}, ${countries.getName(currentData.country, "en")}`
   let date = dateFormat(unixTime, offset)
   let formatDate =  `${date.dayOfWeek}, ${date.dayOfMonth}${date.dateSuffix} ${date.month} ${date.year}`

   domElem.locationName.textContent = location;
   domElem.currentDecription.textContent = capitaliseString(currentData.current.weather[0].description)
   domElem.footerLocation.textContent = location;
   domElem.currentDay.textContent = date.dayOfWeek
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
   domElem.mainDegree.textContent = `${formatTemperature(currentData.current.temp)} ${formatUnite(data.settings.units)}`
   domElem.mainDegree.classList.add('temperature')

   // domElem.degreeUnit.textContent = formatUnite(data.settings.units)
   domElem.currentRealFeel.textContent = formatTemperature(currentData.current.feels_like)
   domElem.currentHumidity.textContent = `${currentData.current.humidity}%`;
   domElem.currentPressure.textContent = `${currentData.current.pressure}hPa`;
   domElem.currentWind.textContent = formatDistance(currentData.current.wind_speed, data.settings.units)
   domElem.currentSunrise.textContent = timeFormat(currentData.current.sunrise, offset, data.settings.units)
   domElem.currentSunset.textContent = timeFormat(currentData.current.sunset, offset, data.settings.units)

   domElem.footerDegree.textContent =  `${formatTemperature(currentData.current.temp)} ${formatUnite(data.settings.units)}`;
   domElem.footerDegree.classList.add('temperature')

}


export function displayDailyWeather(currentData) {
//  const currentData = await getFullWeatherData(currentCity)
 domElem.weeklyDaysDiv.innerHTML = '';
 const dailyData = currentData.daily
//  console.log(dailyData)
 dailyData.forEach(function(day, index) {
     if (index != 0){
     let date = dateFormat(day.dt, currentData.timezone_offset, 'abbr')
     const  eachWeekDay = document.createElement('div')
     eachWeekDay.classList.add('day')
    //  eachWeekDay.attributes('draggable', true)

      const  weekDay = document.createElement('span')
      weekDay.classList.add('weekdays')
      weekDay.textContent = date.dayOfWeek
    

      const weekDayMaxTemp = document.createElement('span')
      weekDayMaxTemp.classList.add('degree', 'temperature')
      weekDayMaxTemp.textContent = `${formatTemperature(day.temp.max)} ${formatUnite(data.settings.units)}`

    
      const weekDayMinTemp = document.createElement('span')
      weekDayMinTemp.classList.add('min-temp', 'temperature')
      weekDayMinTemp.textContent = `${formatTemperature(day.temp.min)} ${formatUnite(data.settings.units)}`


      const weekDayIcon = document.createElement('span')
      weekDayIcon.classList.add('icon')
      weekDayIcon.innerHTML = getWeatherIcon(day.weather[0].icon)
      
      eachWeekDay.append(weekDay, weekDayMaxTemp, weekDayMinTemp,  weekDayIcon)
      domElem.weeklyDaysDiv.appendChild(eachWeekDay)
     }
 });
    
};


export async function displayBigCitiesWeather(bigCities) {
    bigCities.forEach( async bigcity => {
    const currentData = await getFullWeatherData(bigcity)
    const bigCity = document.createElement('div')
    bigCity.classList.add('bigCity')

    const bigCityLeft = document.createElement('div')
    bigCityLeft.classList.add('bigCity-left')
    
    const bigCityRight = document.createElement('div')
    bigCityRight.classList.add('bigCity-left')

    const bigCityLocation = document.createElement('div');
    bigCityLocation.classList.add("big-city-location")
    

    let country = document.createElement('p')
    country.textContent = currentData.country

    let city = document.createElement('h4')
    city.textContent = currentData.name

    let description = document.createElement('p')
    description.textContent = capitaliseString(currentData.current.weather[0].description)

    let icon = document.createElement('div')
    icon.innerHTML = getWeatherIcon(currentData.current.weather[0].icon)

    let temp = document.createElement('div')
    temp.textContent = `${formatTemperature(currentData.current.temp)} ${formatUnite(data.settings.units)}`
    temp.classList.add('temperature')


    bigCityRight.append(temp, icon)
    bigCityLocation.append(country, city)
    bigCityLeft.append(bigCityLocation, description)
    bigCity.append(bigCityLeft, bigCityRight)

    domElem.bigCityContainer.append(bigCity)

    });

} 