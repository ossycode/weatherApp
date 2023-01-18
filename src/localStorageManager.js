

export const fetchData = () => {
    const weatherData = readDataFromLocalStorage('weatherData')
    if (weatherData === null){
        

    }
}




// save weather deta to local storage
export function saveWeatherDataToLocal (name, data)  {
localStorage.setItem(name, JSON.stringify(data))
}


 function readDataFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
  }
