import { useState } from 'react';



export default function App () {
  //API KEYS
  //GET WEATHER FROM SEARCHING UP
  const weatherAPIKey = "391cbb4a58a8cc222403d449bb858880";
  const defaultQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherAPIKey}`;
  
  const [inputVal, setInputVal] = useState('');
  const [weatherVal, setWeatherVal] = useState('');
  function handleClick () {
    getWeather(inputVal);
  }

  async function getWeather() {
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
       <p className = "cityWeather">Weather: {weatherVal}</p>
       <button 
          onClick = {handleClick}
       >
        Click Me to Get Weather</button>
     </div>
  );


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
