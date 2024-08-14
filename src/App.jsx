import { useState } from 'react';

export default function App () {
  //API KEYS
  //GET WEATHER FROM SEARCHING UP
  const weatherAPIKey = "391cbb4a58a8cc222403d449bb858880";
  const defaultQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherAPIKey}`;
  const [inputVal, setInputVal] = useState('');
  const [weatherVal, setWeatherVal] = useState('');
  const [weatherAtLocationVal, setWeatherAtLocationVal] = useState('');
  // const [handledLocationRequestVal, setHandledLocationRequestVal] = useState('');
  const [currentLatitudeVal, setLatitudeVal] = useState('');
  const [currentLongitudeVal, setLongitudeVal] = useState('');

  function handleClick () {
    setWeatherVal('');

    //Function that Cause Errors Below
    // getCurrentLocationWeather(); 
    getSearchedWeather(); 
  }

  //Gets Current Weather of the Location You Are At
  async function error (err) {
    console.warn(`(ERROR ${err.code}): ${err.message}`);
  }
  
  async function success(pos) {
    console.log("Working");
    const crds = pos.coords;
    setLatitudeVal(`${crds.latitude}`);
    setLongitudeVal(`${crds.longitude}`);
    console.log(`${currentLatitudeVal}, ${currentLongitudeVal}`);
  }


  //SOMETHING IS WRONG HERE BELOW. CHECK IT OUT: Location takes a bit of time to get. Erase the try statement 
  //Look at Brocode course and attempt to solve the issue
  async function getCurrentLocationWeather () {
    navigator.geolocation.getCurrentPosition(await success, await error);
    try {
    let queryURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${currentLatitudeVal}&lon=${currentLongitudeVal}&appid=${weatherAPIKey}`;

    const weatherResult = await fetchData(queryURL);
    if (weatherResult !== undefined) {
      setWeatherAtLocationVal(weatherResult + " F");
    }
    }
    catch (error){
      console.log("Not Good");
    }
  }

  //SOMETHING IS WRONG HERE ABOVE. CHECK IT OUT: Location takes a bit of time to get. Erase the try statement 
  //Look at Brocode course in JavaScript for promises and api fetching and attempt to solve the issue

  async function getSearchedWeather() {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${weatherAPIKey}`;
    const weatherResult = await fetchData(queryURL);
    if (weatherResult !== undefined) {
      setWeatherVal(weatherResult + " F");
    }
  }

  function handleInputValue(event) {
    setInputVal(event.target.value);
  }
  
  return (
    <div className = "weatherHeader">
      <input type = "text" value = {inputVal} onChange={handleInputValue}/>
       <p className = "locationWeather">Weather at Location: {weatherAtLocationVal}</p>
       <p className = "cityWeather">Weather: {weatherVal}</p>
       <button onClick = {handleClick}>Click Me to Get Weather</button>
     </div>
  );

  //Fetches Weather Based on Provided Query
  async function fetchData (queryURL) {
    try {
      let response = await fetch(queryURL);
      console.log(response);
      if (!response.ok) {
        throw new Error("Invalid Place");
      }
      const data = await response.json();
      console.log(data);
      console.log();
      console.log(data.main.temp);
      let fahrenheitTemp = (data.main.temp - 273.15) * 9/5 + 32;
      return Math.round(fahrenheitTemp);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
}
