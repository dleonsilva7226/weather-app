import { useState } from 'react';

export default function App () {
  //API KEYS
  //GET WEATHER FROM SEARCHING UP
  const weatherAPIKey = "391cbb4a58a8cc222403d449bb858880";
  const defaultQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherAPIKey}`;
  
  const [inputVal, setInputVal] = useState('');
  const [weatherVal, setWeatherVal] = useState('');
  const [weatherAtLocationVal, setWeatherAtLocationVal] = useState('');
  const [handledLocationRequestVal, setHandledLocationRequestVal] = useState('');
  const [currentLatitudeVal, setLatitudeVal] = useState('');
  const [currentLongitudeVal, setLongitudeVal] = useState('');

  //Gets Current Weather of the Location You Are At
  function getCurrentLocationWeather () {
    navigator.geolocation.getCurrentPosition(handleLocationRequest, error);
  }

  function error (err) {
    console.warn(`(ERROR ${err.code}): ${err.message}`);
  }
  
  function handleLocationRequest(pos) {
    console.log("Working");
    setWeatherVal('');
    const crds = pos.coords;
    setLatitudeVal(`${crds.latitude}`);
    setLongitudeVal(`${crds.longitude}`);
    getWeather();
    setHandledLocationRequestVal(true);
  }
  
  function handleClick () {
    setWeatherVal('');
    if (handledLocationRequestVal) {
      getWeather();  
    } else {
      getCurrentLocationWeather();
    }
  }

  async function getWeather() {
    let queryURL = "";
    if (handledLocationRequestVal) {
      queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${weatherAPIKey}`;
    } else {
      queryURL = `https://api.openweathermap.org/data/3.0/onecall/overview?lon=${currentLongitudeVal}&lat=${currentLatitudeVal}&appid=${weatherAPIKey}`;
    }
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
       <p className = "cityWeather">Weather: {weatherVal}</p>
       <button onClick = {handleClick}>Click Me to Get Weather</button>
     </div>
  );

  //Fetches Weather Based on Provided Query
  async function fetchData (queryURL) {
    try {
      let response = await fetch(queryURL);
      if (!response.ok) {
        throw new Error("Invalid Place");
      }

      const data = await response.json();
      console.log(data.main.temp);
      let fahrenheitTemp = (data.main.temp - 273.15) * 9/5 + 32;
      return Math.round(fahrenheitTemp);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
}
