import { useEffect, useState } from 'react';
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
  const [canSearch, setCanSearch] = useState(false);
  const [canSearchByButton, setCanSearchByButton] = useState(true);
  const [canSearchByEnter, setCanSearchByEnter] = useState(false);
  const [weatherLocInfoArr, setWeatherLocInfoArr] = useState([]);
  /*Make a countrycode **ARRAY OR MAP HERE** so you can 
  search for countries by its full name or Country Code*/
  

  //Searches on Every Render of the Page
  useEffect(() => {
    if (canSearch){
      handleSearch();
      setCanSearch(false);
    }
  });
  

  function deleteComponent(componentID) {
    const newArr = cityWeatherArr.filter((item) => (componentID !== item.id));
    updateCityWeatherArr(newArr);
  }

  //Have the city also be identifiable by Country
  return (
      <div className = "weatherHeader">
        <div className = "titleAndHeaderContainer">
          <p className = "titleLogo"> ⛅ SkyLens ⛅ </p>
          <div className = "headerContainer">
            <div className = "headerInfo">
              <p className = "cityCaption">City: </p>
              <input type = "text" value = {inputVal} className = "searchBox" onChange={handleInputValue} placeholder="Search City"/>
              <button onClick = {() => {setCanSearch(true)}} className = "getWeatherButton">{`🔍`}</button>
            </div>
          </div>
        </div>

      <div className="weatherContainer"> 
        {cityWeatherArr.length === 0 && "Try Searching For A Place!"}
        {cityWeatherArr.map(weatherComponentInfo => {
          return (
          <div key = {weatherComponentInfo.id} className = {`weatherInfo ${weatherComponentInfo.currentTimeZone}`}>
            <div className = "deleteButtonContainer">
              <button onClick = {() => deleteComponent(weatherComponentInfo.id)} className = "deleteButton">Delete</button>
            </div>
            <div className = "weatherStatsInfo">
              <p className = "overallWeather">Overall: {weatherComponentInfo.weatherFeeling}</p>
              <p className = "cityName">City: {weatherComponentInfo.city}</p>
              <p className = "cityWeather">Weather: {weatherComponentInfo.weather}</p>
              <p className = "countryName">Country: {weatherComponentInfo.country}</p>
              <p className = "humidityLevels">Humidity: {weatherComponentInfo.totalHumidity}</p>
              <p className = "windspeedLevels">Wind: {weatherComponentInfo.totalWindSpeed}</p>
            </div>
          </div>
          ) 
        }
        )}
       </div>
     </div>
  );

  async function handleSearch () {
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
    
    
    const weatherStats = await getSearchedWeather();
    console.log(weatherStats);
    if (weatherStats !== undefined && weatherStats.length == 7 && weatherStats[0] !== ''  && weatherStats[1] !== ''  
      && weatherStats[2] !== ''  && weatherStats[3] !== ''  
      && weatherStats[4] !== ''  && weatherStats[5] !== '') {

      if (cityWeatherArr.length < 4 ){
        updateCityWeatherArr ((currentWeatherArr) => {

          return [
            ...currentWeatherArr, 
            {id: crypto.randomUUID(), weather: weatherStats[0], country: weatherStats[1], 
              city: weatherStats[2], weatherFeeling: weatherStats[3], totalHumidity: weatherStats[4], 
              totalWindSpeed: weatherStats[5], currentTimeZone: weatherStats[6]}
          ]
        });
      }

    }    
  }




  //Gets Current Weather of the Location You Are At
  // async function error (err) {
  //   console.warn(`(ERROR ${err.code}): ${err.message}`);
  // }
  
  // async function success(pos) {
  //   const crds = pos.coords;
  //   const latitude = await crds.latitude;
  //   const longitude = await crds.longitude;
  //   setLatitudeVal(latitude);
  //   setLongitudeVal(longitude);
  //   console.log(`${latitude}, ${longitude}`);
  //   console.log(`${currentLatitudeVal}, ${currentLongitudeVal}`);
  // }





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




  //FUNCTION NOT RENDERING HERE CORRECTLY. CHECK WHAT'S WRONG. POSSIBLY THE USE STATE NEEDING TO AWAIT. FIGURE THAT OUT
  
  async function getSearchedWeather() {
    try {
    let queryURL = "";
    if (!inputVal.includes(",")) {
      queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${weatherAPIKey}&units=imperial`;
    } 
    else {
      let inputString = inputVal;
      inputString.trim();
      let infoArr = inputString.split(",");
      infoArr[0] = infoArr[0].trim();
      if (infoArr.length <= 2) {
        infoArr[1] = infoArr[1].trim();
        queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${infoArr[0]},${infoArr[1]}&appid=${weatherAPIKey}&units=imperial`;
      } else {
        queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${infoArr[0]}&appid=${weatherAPIKey}&units=imperial`;
      }       
    }
    const weatherStats = await fetchData(queryURL);
    if (weatherStats !== undefined) {
      setWeatherVal(weatherStats[0]);
      setCountryName(weatherStats[1]);
      setCityName(weatherStats[2]);
      setOverallWeather(weatherStats[3]);
      setHumidity(weatherStats[4]);
      setWindSpeed(weatherStats[5]);
      setTimeZone(weatherStats[6]);
      return weatherStats;
      
    } else {
      console.log("No Results Found");
      return [];
    }
  } catch (error) {
    console.error("Invalid Location!");
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
      return [Math.round(data.main.temp) + " F", data.sys.country, data.name, 
        data.weather[0].main, data.main.humidity + "%",
        data.wind.speed + " mph", getTimeBackground(data)];
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  function getTimeBackground(data) {
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
      return backgroundClassesArr[3];
    } else if (currentHour >= 21 && currentHour <= 23) {
      return backgroundClassesArr[4];
    } else if (currentHour >= 0 && currentHour <= 5) {
      return backgroundClassesArr[5];
    } else if (currentHour >= 6 && currentHour <= 7) {
      return backgroundClassesArr[0];
    } else if (currentHour >= 8 && currentHour <= 11) {
      return backgroundClassesArr[1];
    } else if (currentHour >= 12 && currentHour <= 17) {
      return backgroundClassesArr[2];
    }

  }

}