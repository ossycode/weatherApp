


const city = readDataFromLocalStorage('userCity') ? readDataFromLocalStorage('userCity') : ''


  const fetchData = () => {
    const weatherData = readDataFromLocalStorage('weatherData')
    if (weatherData === null){
        return {
            bigCities: [ "London", "Sydney", "Shanghai", "New York", "Berlin", "Lagos", "San Francisco", "Mumbai"
                // {id: '802', coords: {lon: -0.1257, lat: 51.5085}, city: "London", country: "UK"},
                // {id: '520', coords: {lon: 151.2073, lat: -33.8679}, city: "Sydney", country: "AU"},
                // {id: "93a6", coords: {lon: 121.4581, lat: 31.2222}, city: "Shanghai", country: "CN"},
                // {id: "93a6", coords: {lon: -74.006, lat: 40.7143}, city: "New York", country: "US"},
            ], 
            settings: {
                units: "metric",
                clockFormat: "12",
            },
            currentCity: {
                city: "Sydney",
                coords: {lon: -74.006, lat: 40.7143}
            },
            userLocation: {
                city: city, 
                coords: ''
            }
        }

    }
}


export const data = fetchData()

// save weather deta to local storage
export function saveWeatherDataToLocal (name, data)  {
localStorage.setItem(name, JSON.stringify(data))
}


 function readDataFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
  }
