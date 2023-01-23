import Chart from 'chart.js/auto'
import {differenceInMilliseconds, differenceInMinutes,format, fromUnixTime, getUnixTime,} from "date-fns";


// export function convertWeather(temp, unit) {
// 	let celcius = Math.round(parseFloat(temp.main.temp)-273.15);
// 	let fahrenheit = Math.round(((parseFloat(temp.main.temp)-273.15)*1.8)+32); 


// 	return 
	
	
// 	return {celcius, fahrenheit}
// }

export function formatTemperature(temperature) {
	return Math.round(temperature)
}

export function formatUnite (units) {
	if (units === "imperial") {
		return "°F";
	  } else {
		return "°C";
	  }
	}

export function formatDistance (data, units) {
	if (units === "imperial") {
		return data + "mph";
	  } else {
		return data + "m/s";
	  }
}

// Capitalise a string 
export function capitaliseString (string) {
	const capitalzedName = 
	string.charAt(0).toUpperCase() +
	string.slice(1);
	console.log(capitalzedName)
	return capitalzedName;
}


export function formatToday(time) {
	const date = fromUnixTime(time);
	return format(date, 'EEEE');
}

// format a unix date
// return only the day of the week is formatedDate = 'day
export function  dateFormat(unix, offset){
	const date = fromUnixTime(unix + offset).toUTCString();
	// console.log("date is " +  date)
	let dateSuffix 
	let dayOfWeek = date.slice(0, 3);
	let dayOfMonth = date.slice(5, 7);
	let month = date.slice(8, 11);
	let year = date.slice(14, 16)
	

	if (dayOfMonth < 10) {
		dayOfMonth = dayOfMonth.slice(1);
	}
	// set correct date suffix
	if (dayOfMonth.slice(-1) === '1') {
		dateSuffix = 'st'
	}else if (dayOfMonth.slice(-1) === '2'){
		dateSuffix = 'nd';
	}else if (dayOfMonth.slice(-1) === '3'){
		dateSuffix = 'rd';
	}else if (dayOfMonth > 3 && dayOfMonth < 21) {
		dateSuffix = 'th';
	}else {
		dateSuffix = 'th';
	}

	// change day abbreviation to full (eg Sun to Sunday)
	if (dayOfWeek === 'Mon') {
		dayOfWeek = 'Monday';
	}else if (dayOfWeek === 'Tue') {
		dayOfWeek = 'Tuesday';
	}else if (dayOfWeek === 'Wed') {
		dayOfWeek = 'Wednesday';
	}else if (dayOfWeek === 'Thu') {
		dayOfWeek = 'Thursday';
	}else if (dayOfWeek === 'Fri') {
		dayOfWeek = 'Friday';
	}else if (dayOfWeek === 'Sat') {
		dayOfWeek = 'Saturday';
	}else if (dayOfWeek === 'Sun') {
		dayOfWeek = 'Sunday';
	}

	// console.log(date)
	// return the full date

	const newDate = {dayOfWeek, dayOfMonth, dateSuffix, month, year}

	// `${dayOfWeek}, ${dayOfMonth}${dateSuffix} ${month} '${year}`
	return newDate;
	
}


export function getCurrentCityTime (offset) {
	const date = new Date();
	const locatTime = date.getTime()
	const localOffset = date.getTimezoneOffset() * 60000;
	const utc = locatTime + localOffset;
	const locationTime = utc + 1000 * offset;
	const unixTime = locationTime / 1000;
	return unixTime;
}

// get the sunrise or sunset time
// export function getSunriseOrSunsetTime(setTime, timeZone) {
//  const time =  new Date(setTime * 1000).toLocaleTimeString('default',  timeZone)
//  console.log(time)
//  const min = time.indexOf(3,4)
//  console.log(min)


// //  toLocaleString('default',  timeZone);
// //    const locationTime = settime + 1000 * offset;
// // 	const unixSetTime = locationTime / 1000;

// 	// var hours = dt.getHours() ; // gives the value in 24 hours format
// 	var AmOrPm = time >= 12 ? 'pm' : 'am';
// 	time = (time % 12) || 12;
// 	var minutes = dt.getMinutes() ;
// 	var finalTime = "Time  - " + hours + ":" + minutes + " " + AmOrPm; 
// 	return finalTime;
//   }

export function getTheTimeDifference (locationTime) {
	const localTime = new Date();
	const formatCityTime = fromUnixTime(locationTime)

	const timeDifference = (differenceInMinutes(localTime, formatCityTime) / 60).toFixed(0);
	console.log(timeDifference)

	return timeDifference;
}

export function convertTimeFormat(time, clockFormat) {
	const date = fromUnixTime(time);
	if (clockFormat === '12') {
		return format(date, 'pp');
	}else if (clockFormat === "24") {
		return format(date, 'H:mm:ss');
	}
}



// conver UTC string time format
// get the sunrise or sunset time
export function timeFormat (unix, offset, unit) {
	let timeSuffix
	const date = fromUnixTime(unix + offset).toUTCString();
	if (!unit === "metric"){

		let d = new Date(date)
		let hours = d.getHours()
		timeSuffix = hours >= 12 ? 'pm' : 'am'
		hours = hours % 12;
  		hours = hours ? hours : 12;
		return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + timeSuffix

	}else {
	let hour = date.slice(17, 19);
	let minute = date.slice(20, 22);
	if (hour < 12 ) {
		timeSuffix = 'am';
	}else {
		timeSuffix = 'pm';
	}
	// 24hr format to 12hr format)
	if (hour > 12) {
		hour -= 12;
	}

	// change am timeSuffix to 12hr time
	if (hour < 10 && timeSuffix === 'am') {
		hour = hour.slice(1, 2)
	}

	// set midnight hour
	if (hour === '0') {
		hour = 12;
	}

	// return the full time.
	return `${hour}:${minute} ${timeSuffix}`;
	}
}




(async function() {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(
    document.getElementById('graph'),
    {
      type: 'bar',
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
		layout: {
            // padding:  {
			// 	top: 20,
			// 	left: 20,
			// 	right: 20,
			// 	bottom: 20,

			// }
        },
		
      },
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count),
			backgroundColor: '#fcd34d',
			barThickness: 4,  // number (pixels) or 'flex'
            maxBarThickness: 5 // number (pixels)


          }
        ]
      }
    }
  );
})();
 