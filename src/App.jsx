import { useState } from 'react';
import React from 'react';
// import ReactDOM from 'react-dom/client';
import './styles.css';

export default function App () {
  //API KEYS
  //GET WEATHER FROM SEARCHING UP
  const weatherAPIKey = "391cbb4a58a8cc222403d449bb858880";
  // const defaultQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherAPIKey}`;
  const [inputVal, setInputVal] = useState('');
  const [weatherVal, setWeatherVal] = useState('');
  const [countryName, setCountryName] = useState('');
  // const [weatherAtLocationVal, setWeatherAtLocationVal] = useState('');
  const [cityName, setCityName] = useState('');
  // const [handledLocationRequestVal, setHandledLocationRequestVal] = useState('');
  const [currentLatitudeVal, setLatitudeVal] = useState('');
  const [currentLongitudeVal, setLongitudeVal] = useState('');
  const [overallWeather, setOverallWeather] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const backgroundClassesArr = ["dawnTime", "midMorningTime", "midAfternoonTime", "earlyEveningTime", "midEveningTime", "midnightTime"];
  const [cityWeatherArr, updateCityWeatherArr] = useState([]);


  //Have the city also be identifiable by Country
  return (
      <div className = "weatherHeader">
        <div className = "headerContainer">
          <div className = "headerInfo">
            <p className = "cityCaption">City: </p>
            <input type = "text" value = {inputVal} className = "searchBox" onChange={handleInputValue}/>
            <button onClick = {handleSearch} className = "getWeatherButton">{`🔍`}</button>
          </div>
        </div>

      <div className="weatherContainer"> 

        {cityWeatherArr.map(weatherComponentInfo => {
          return (
          <div key = {weatherComponentInfo.id} className = {`weatherInfo ${weatherComponentInfo.currentTimeZone}`}>
            <button onClick = {handleExit} className = "deleteButton">Exit</button>
            <p className = "overallWeather">Overall: {weatherComponentInfo.weatherFeeling}</p>
            <p className = "cityName">City: {weatherComponentInfo.city}</p>
            <p className = "cityWeather">Weather: {weatherComponentInfo.weather}</p>
            <p className = "countryName">Country: {weatherComponentInfo.country}</p>
            <p className = "humidityLevels">Humidity: {weatherComponentInfo.totalHumidity}</p>
            <p className = "windspeedLevels">Wind: {weatherComponentInfo.totalWindSpeed}</p>
          </div>
          ) 
        }

        )}

       </div>
     </div>
  );

  function handleExit () {
    console.log("Exiting...");
  }

  function handleSearch () {
    setWeatherVal('');
    setCountryName('');
    setCityName('');
    setOverallWeather('');
    setHumidity('');
    setWindSpeed('');
    setTimeZone('');
    //DO THIS LATER
    // getCurrentLocationWeather(); 
    //DO ABOVE LATER
    
    //SOMETHING WRONG AND MAKE THE FUNCTION ASYNC
    getSearchedWeather();
    
    if (cityWeatherArr.length < 4 ){
      updateCityWeatherArr ((currentWeatherArr) => {
        return [
          ...currentWeatherArr, 
          {id: crypto.randomUUID(), weather: weatherVal, country: countryName, 
            city: cityName, weatherFeeling: overallWeather, totalHumidity: humidity, 
            totalWindSpeed: windSpeed, currentTimeZone: timeZone}
        ]
      });
    }
    //SOMETHING WRONG AND MAKE THE FUNCTION ABOVE ASYNC

    console.log("The Array: " + cityWeatherArr);

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
  // async function getCurrentLocationWeather () {
    
  //   // navigator.geolocation.getCurrentPosition(success, error);

  //   // try {
  //     // let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${-0.1257}&lon=${51.5085}&appid=${weatherAPIKey}`;

  //   let queryURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${-0.1257}&lon=${51.5085}&appid=${weatherAPIKey}`;

  //   const weatherResult = await fetchData(queryURL);
  //   if (weatherResult !== undefined) {
  //     setWeatherAtLocationVal(weatherResult + " F");
  //   }
  //   // }
  //   // catch (error){
  //   //   console.log("Not Good");
  //   // }
  // }

  //SOMETHING IS WRONG HERE ABOVE. CHECK IT OUT: Location takes a bit of time to get. Erase the try statement 
  //Look at Brocode course in JavaScript for promises and api fetching and attempt to solve the issue




  //FUNCTION NOT RENDERING HERE CORRECTLY. CHECK WHAT'S WRONG. POSSIBLY THE USE STATE NEEDING TO AWAIT
  async function getSearchedWeather() {
    try {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${weatherAPIKey}&units=imperial`;
    const weatherResult = await fetchData(queryURL);
    // console.log(weatherResult);
    if (weatherResult !== undefined) {
      setWeatherVal(weatherResult + " F");
      return "Promise Completed";

    } else {
      console.log("No Results Found");
      return "Promise Rejected"
    }
  } catch (error) {
    console.error("Not Good");
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
    let utcHours = now.getUTCHours();
    console.log(utcHours);
    console.log(data.timezone/3600);
    if (utcHours + data.timezone/3600 < 0) {
      utcHours += 24;
    }
    console.log(utcHours);
    let currentHour = utcHours + (data.timezone/3600);
    if (currentHour >= 24) {
      currentHour = currentHour % 24;
    }
    console.log("Current Hour: " + currentHour);
    if (currentHour >= 18 && currentHour <= 20) {
      setTimeZone(backgroundClassesArr[3]);
    } else if (currentHour >= 21 && currentHour <= 23) {
      setTimeZone(backgroundClassesArr[4]);
    } else if (currentHour >= 0 && currentHour <= 5) {
      setTimeZone(backgroundClassesArr[5]);
    } else if (currentHour >= 6 && currentHour <= 7) {
      setTimeZone(backgroundClassesArr[0]);
    } else if (currentHour >= 8 && currentHour <= 11) {
      setTimeZone(backgroundClassesArr[1]);
    } else if (currentHour >= 12 && currentHour <= 17) {
      setTimeZone(backgroundClassesArr[2]);
    }

    // console.log(utcString);
  }

}