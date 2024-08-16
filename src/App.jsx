import { useState } from 'react';
import React from 'react';
// import ReactDOM from 'react-dom/client';
import './styles.css';

export default function App () {
  //API KEYS
  //GET WEATHER FROM SEARCHING UP
  const weatherAPIKey = "391cbb4a58a8cc222403d449bb858880";
  const defaultQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherAPIKey}`;
  const [inputVal, setInputVal] = useState('');
  const [weatherVal, setWeatherVal] = useState('');
  const [countryName, setCountryName] = useState('');
  const [weatherAtLocationVal, setWeatherAtLocationVal] = useState('');
  const [cityName, setCityName] = useState('');
  // const [handledLocationRequestVal, setHandledLocationRequestVal] = useState('');
  const [currentLatitudeVal, setLatitudeVal] = useState('');
  const [currentLongitudeVal, setLongitudeVal] = useState('');
  const [overallWeather, setOverallWeather] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [timeZone, setTimeZone] = useState();
  const backgroundClassesArr = ["dawnTime", "midMorningTime", "midAfternoonTime", "earlyEveningTime", "midEveningTime", "midnightTime"];
  const backgroundTimezoneColorsArr = [];

  return (
      <div className = "weatherHeader">
        <div className = "headerContainer">
          <div className = "headerInfo">
            <p className = "cityCaption">City: </p>
            <input type = "text" value = {inputVal} className = "searchBox" onChange={handleInputValue}/>
            <button onClick = {handleClick} className = "getWeatherButton">{`🔍`}</button>
          </div>
        </div>
       {/* <p className = "locationWeather">Weather at Location: {weatherAtLocationVal}</p> */}
      <div className="weatherContainer"> 
        <div className = {`weatherInfo ${timeZone}`}>
          <button className = "deleteButton">Exit</button>
          <p className = "overallWeather">Overall: {overallWeather}</p>
          <p className = "cityName">City: {cityName}</p>
          <p className = "cityWeather">Weather: {weatherVal}</p>
          <p className = "countryName">Country: {countryName}</p>
          <p className = "humidityLevels">Humidity: {humidity}</p>
          <p className = "windspeedLevels">Wind: {windSpeed}</p>
        </div>
       </div>
     </div>
  );

  function handleClick () {
    setWeatherVal('');
    setCountryName('');
    setCityName('');
    setOverallWeather('');
    setHumidity('');
    setWindSpeed('');
    //DO THIS LATER
    // getCurrentLocationWeather(); 
    getSearchedWeather(); 
  }

  //Gets Current Weather of the Location You Are At
  async function error (err) {
    console.warn(`(ERROR ${err.code}): ${err.message}`);
  }
  
  async function success(pos) {
    const crds = pos.coords;
    const latitude = await crds.latitude;
    const longitude = await crds.longitude;
    setLatitudeVal(latitude);
    setLongitudeVal(longitude);
    console.log(`${latitude}, ${longitude}`);
    console.log(`${currentLatitudeVal}, ${currentLongitudeVal}`);
  }


  //SOMETHING IS WRONG HERE BELOW. CHECK IT OUT: Location takes a bit of time to get. Erase the try statement 
  //Look at Brocode course and attempt to solve the issue
  async function getCurrentLocationWeather () {
    
    // navigator.geolocation.getCurrentPosition(success, error);

    // try {
      // let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${-0.1257}&lon=${51.5085}&appid=${weatherAPIKey}`;

    let queryURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${-0.1257}&lon=${51.5085}&appid=${weatherAPIKey}`;

    const weatherResult = await fetchData(queryURL);
    if (weatherResult !== undefined) {
      setWeatherAtLocationVal(weatherResult + " F");
    }
    // }
    // catch (error){
    //   console.log("Not Good");
    // }
  }

  //SOMETHING IS WRONG HERE ABOVE. CHECK IT OUT: Location takes a bit of time to get. Erase the try statement 
  //Look at Brocode course in JavaScript for promises and api fetching and attempt to solve the issue

  async function getSearchedWeather() {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${weatherAPIKey}&units=imperial`;
    const weatherResult = await fetchData(queryURL);
    // console.log(weatherResult);
    if (weatherResult !== undefined) {
      setWeatherVal(weatherResult + " F");
    } else {
      console.log("No Results Found");
    }
  }

  function handleInputValue(event) {
    setInputVal(event.target.value);
  }

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
      // let fahrenheitTemp = (data.main.temp - 273.15) * 9/5 + 32;
      setCountryName(data.sys.country);
      setCityName(data.name);
      setOverallWeather(data.weather[0].main);
      setHumidity(data.main.humidity + "%");
      setWindSpeed(data.wind.speed + " mph");
      setTimeBackground(data);
      return Math.round(data.main.temp);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  function setTimeBackground(data) {
    const now = new Date();
    const utcString = now.toUTCString();
    console.log(utcString);
  }

}