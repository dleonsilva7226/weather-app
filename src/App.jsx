import { useEffect, useState } from 'react';
import React from 'react';
// import ReactDOM from 'react-dom/client';
import './styles.css';
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';



export default function App () {
  //API KEY
  const weatherAPIKey = "391cbb4a58a8cc222403d449bb858880";


  const [inputVal, setInputVal] = useState('');
  const [weatherVal, setWeatherVal] = useState('');
  const [countryName, setCountryName] = useState('');
  const [cityName, setCityName] = useState('');
  const [currentLatitudeVal, setLatitudeVal] = useState('');
  const [currentLongitudeVal, setLongitudeVal] = useState('');
  const [overallWeather, setOverallWeather] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const backgroundClassesArr = ["dawnTime", "midMorningTime", "midAfternoonTime", "earlyEveningTime", "midEveningTime", "midnightTime"];
  const [cityWeatherArr, updateCityWeatherArr] = useState([]);
  const [canSearch, setCanSearch] = useState(false);
  const [weatherLocInfoArr, setWeatherLocInfoArr] = useState([]);
  const [currentWeatherLogo, setCurrentWeatherLogo] = useState('');
  // Country Code Map Below (with territories included)
  const countryMap = new Map([
    ["afghanistan", "AF"],
    ["albania", "AL"],
    ["algeria", "DZ"],
    ["andorra", "AD"],
    ["angola", "AO"],
    ["antigua and barbuda", "AG"],
    ["argentina", "AR"],
    ["armenia", "AM"],
    ["australia", "AU"],
    ["austria", "AT"],
    ["azerbaijan", "AZ"],
    ["bahamas", "BS"],
    ["bahrain", "BH"],
    ["bangladesh", "BD"],
    ["barbados", "BB"],
    ["belarus", "BY"],
    ["belgium", "BE"],
    ["belize", "BZ"],
    ["benin", "BJ"],
    ["bhutan", "BT"],
    ["bolivia", "BO"],
    ["bosnia and herzegovina", "BA"],
    ["botswana", "BW"],
    ["brazil", "BR"],
    ["brunei", "BN"],
    ["bulgaria", "BG"],
    ["burkina faso", "BF"],
    ["burundi", "BI"],
    ["cabo verde", "CV"],
    ["cambodia", "KH"],
    ["cameroon", "CM"],
    ["canada", "CA"],
    ["central african republic", "CF"],
    ["chad", "TD"],
    ["chile", "CL"],
    ["china", "CN"],
    ["colombia", "CO"],
    ["comoros", "KM"],
    ["democratic republic of the congo", "CD"],
    ["republic of the congo", "CG"],
    ["costa rica", "CR"],
    ["croatia", "HR"],
    ["cuba", "CU"],
    ["cyprus", "CY"],
    ["czech republic", "CZ"],
    ["denmark", "DK"],
    ["djibouti", "DJ"],
    ["dominica", "DM"],
    ["dominican republic", "DO"],
    ["ecuador", "EC"],
    ["egypt", "EG"],
    ["el salvador", "SV"],
    ["equatorial guinea", "GQ"],
    ["eritrea", "ER"],
    ["estonia", "EE"],
    ["eswatini", "SZ"],
    ["ethiopia", "ET"],
    ["fiji", "FJ"],
    ["finland", "FI"],
    ["france", "FR"],
    ["gabon", "GA"],
    ["gambia", "GM"],
    ["georgia", "GE"],
    ["germany", "DE"],
    ["ghana", "GH"],
    ["greece", "GR"],
    ["grenada", "GD"],
    ["guatemala", "GT"],
    ["guinea", "GN"],
    ["guinea-bissau", "GW"],
    ["guyana", "GY"],
    ["haiti", "HT"],
    ["honduras", "HN"],
    ["hungary", "HU"],
    ["iceland", "IS"],
    ["india", "IN"],
    ["indonesia", "ID"],
    ["iran", "IR"],
    ["iraq", "IQ"],
    ["ireland", "IE"],
    ["israel", "IL"],
    ["italy", "IT"],
    ["jamaica", "JM"],
    ["japan", "JP"],
    ["jordan", "JO"],
    ["kazakhstan", "KZ"],
    ["kenya", "KE"],
    ["kiribati", "KI"],
    ["north korea", "KP"],
    ["south korea", "KR"],
    ["kuwait", "KW"],
    ["kyrgyzstan", "KG"],
    ["laos", "LA"],
    ["latvia", "LV"],
    ["lebanon", "LB"],
    ["lesotho", "LS"],
    ["liberia", "LR"],
    ["libya", "LY"],
    ["liechtenstein", "LI"],
    ["lithuania", "LT"],
    ["luxembourg", "LU"],
    ["madagascar", "MG"],
    ["malawi", "MW"],
    ["malaysia", "MY"],
    ["maldives", "MV"],
    ["mali", "ML"],
    ["malta", "MT"],
    ["marshall islands", "MH"],
    ["mauritania", "MR"],
    ["mauritius", "MU"],
    ["mexico", "MX"],
    ["micronesia", "FM"],
    ["moldova", "MD"],
    ["monaco", "MC"],
    ["mongolia", "MN"],
    ["montenegro", "ME"],
    ["morocco", "MA"],
    ["mozambique", "MZ"],
    ["myanmar", "MM"],
    ["namibia", "NA"],
    ["nauru", "NR"],
    ["nepal", "NP"],
    ["netherlands", "NL"],
    ["new zealand", "NZ"],
    ["nicaragua", "NI"],
    ["niger", "NE"],
    ["nigeria", "NG"],
    ["north macedonia", "MK"],
    ["norway", "NO"],
    ["oman", "OM"],
    ["pakistan", "PK"],
    ["palau", "PW"],
    ["panama", "PA"],
    ["papua new guinea", "PG"],
    ["paraguay", "PY"],
    ["peru", "PE"],
    ["philippines", "PH"],
    ["poland", "PL"],
    ["portugal", "PT"],
    ["qatar", "QA"],
    ["romania", "RO"],
    ["russia", "RU"],
    ["rwanda", "RW"],
    ["saint kitts and nevis", "KN"],
    ["saint lucia", "LC"],
    ["saint vincent and the grenadines", "VC"],
    ["samoa", "WS"],
    ["san marino", "SM"],
    ["sao tome and principe", "ST"],
    ["saudi arabia", "SA"],
    ["senegal", "SN"],
    ["serbia", "RS"],
    ["seychelles", "SC"],
    ["sierra leone", "SL"],
    ["singapore", "SG"],
    ["slovakia", "SK"],
    ["slovenia", "SI"],
    ["solomon islands", "SB"],
    ["somalia", "SO"],
    ["south africa", "ZA"],
    ["south sudan", "SS"],
    ["spain", "ES"],
    ["sri lanka", "LK"],
    ["sudan", "SD"],
    ["suriname", "SR"],
    ["sweden", "SE"],
    ["switzerland", "CH"],
    ["syria", "SY"],
    ["taiwan", "TW"],
    ["tajikistan", "TJ"],
    ["tanzania", "TZ"],
    ["thailand", "TH"],
    ["timor-leste", "TL"],
    ["togo", "TG"],
    ["tonga", "TO"],
    ["trinidad and tobago", "TT"],
    ["tunisia", "TN"],
    ["turkey", "TR"],
    ["turkmenistan", "TM"],
    ["tuvalu", "TV"],
    ["uganda", "UG"],
    ["ukraine", "UA"],
    ["united arab emirates", "AE"],
    ["united kingdom", "GB"],
    ["united states", "US"],
    ["united states of america", "US"],
    ["uruguay", "UY"],
    ["uzbekistan", "UZ"],
    ["vanuatu", "VU"],
    ["vatican city", "VA"],
    ["venezuela", "VE"],
    ["vietnam", "VN"],
    ["yemen", "YE"],
    ["zambia", "ZM"],
    ["zimbabwe", "ZW"],
    //territories below
    ["american samoa", "AS"],
    ["anguilla", "AI"],
    ["aruba", "AW"],
    ["ascension island", "AC"],
    ["bermuda", "BM"],
    ["british virgin islands", "VG"],
    ["christmas island", "CX"],
    ["cocos keeling islands", "CC"],
    ["cook islands", "CK"],
    ["faroe islands", "FO"],
    ["french polynesia", "PF"],
    ["gibraltar", "GI"],
    ["guadeloupe", "GP"],
    ["guernsey", "GG"],
    ["isle of man", "IM"],
    ["jersey", "JE"],
    ["montserrat", "MS"],
    ["new caledonia", "NC"],
    ["niue", "NU"],
    ["norfolk island", "NF"],
    ["northern mariana islands", "MP"],
    ["palau", "PW"],
    ["pitcairn islands", "PN"],
    ["puerto rico", "PR"],
    ["reunion", "RE"],
    ["saint helena", "SH"],
    ["saint pierre and miquelon", "PM"],
    ["saint barthelemy", "BL"],
    ["sint maarten", "SX"],
    ["tokelau", "TK"],
    ["turks and caicos islands", "TC"],
    ["us virgin islands", "VI"],
    ["wallis and futuna", "WF"]
]);
  // Country Code Map Above (with territories included)
  

  //Searches Every Time canSearch is true
  useEffect(() => {
    if (canSearch){
      handleSearch();
      setCanSearch(false);
    }
  });
  

  //Deletes Components When The Delete Button is Pressed
  function deleteComponent(componentID) {
    const newArr = cityWeatherArr.filter((item) => (componentID !== item.id));
    updateCityWeatherArr(newArr);
  }

  return (
      <div className = "weatherHeader">
        <div className = "titleAndHeaderContainer">
          <p className = "titleLogo"> ⛅ SkyLens ⛅ </p>
          <div className = "headerContainer"> {/*Header Box for Search Box and Button*/}
            <div className = "headerInfo">
              <p className = "cityCaption">City: </p>
              <input type = "text" value = {inputVal} className = "searchBox" onChange={handleInputValue} placeholder="Search City"/>
              <button onClick = {() => {setCanSearch(true)}} className = "getWeatherButton">{`🔍`}</button>
            </div>
          </div>
        </div>

      {/*Component Weather Info Below*/}
      <div className="weatherContainer"> 
        {cityWeatherArr.length === 0 && "Try Searching For A Place!"}
        {cityWeatherArr.map(weatherComponentInfo => {
          return (
          <div key = {weatherComponentInfo.id} className = {`weatherInfo ${weatherComponentInfo.currentTimeZone}`}>
            <div className = "deleteButtonContainer">
              <button onClick = {() => deleteComponent(weatherComponentInfo.id)} className = "deleteButton">Delete</button>
            </div>
            <div className = "weatherStatsInfo">
              <p className = "locInfo">{weatherComponentInfo.city}, {weatherComponentInfo.country}</p>
              <div className = "overallWeatherContainer">
                <img src= {weatherComponentInfo.tempLogo} alt="Current Weather" width="150" height="150"/>
                <p className = "overallWeather">{weatherComponentInfo.weatherFeeling}</p>
              </div>
              <p className = "cityWeather">Temperature: {weatherComponentInfo.weather}</p>  
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


  /*Calls a Function to Get an Array of WeatherInfo and then Updates the Array
    Of Components By Getting an Array of WeatherInfo. Only Modifies Array if All
    Elements Of WeatherStats Contain Info*/
  async function handleSearch () {
    setWeatherVal('');
    setCountryName('');
    setCityName('');
    setOverallWeather('');
    setHumidity('');
    setWindSpeed('');
    setTimeZone('');
    setCurrentWeatherLogo('');
    //DO THIS LATER (Potentially)
    // getCurrentLocationWeather(); 
    //DO ABOVE LATER (Potentially)
    const weatherStats = await getSearchedWeather();
    console.log(weatherStats);
    let randomUUID = uuidv4();
    if (weatherStats !== undefined && weatherStats.length == 8 && weatherStats[0] !== ''  && weatherStats[1] !== ''  
      && weatherStats[2] !== ''  && weatherStats[3] !== ''  
      && weatherStats[4] !== ''  && weatherStats[5] !== '' && weatherStats[6] !== '' && weatherStats[7] !== '') {
      if (cityWeatherArr.length < 9){
        updateCityWeatherArr ((currentWeatherArr) => {
          return [
            ...currentWeatherArr, 
            {id: randomUUID, weather: weatherStats[0], country: weatherStats[1], 
              city: weatherStats[2], weatherFeeling: weatherStats[3], totalHumidity: weatherStats[4], 
              totalWindSpeed: weatherStats[5], currentTimeZone: weatherStats[6], tempLogo: weatherStats[7]}
          ]
        });
      }

    }    
  }
  
  /*
  Creates the queryURL to get info from OpenWeather API based on either:
  - Name of the City
  - Name of the City as Well as the City's Letter Country Code
  - Name of the City as Well as the City and the full name of the Country 
  */
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
        let newInfoStr = countryMap.get(infoArr[1].toLowerCase());
        console.log(newInfoStr);
        if (newInfoStr !== undefined) {
          // console.log(newInfoStr);
          queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${infoArr[0]},${newInfoStr}&appid=${weatherAPIKey}&units=imperial`;
        } else {
          let countryCode = infoArr[1].toUpperCase();
          // console.log(countryMap.get(infoArr[1]));
          queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${infoArr[0]},${countryCode}&appid=${weatherAPIKey}&units=imperial`;
        }
      } else {
        queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${infoArr[0]}&appid=${weatherAPIKey}&units=imperial`;
      }       
    }
    /*
    Gets the weatherStats Data with API info
    */
    const weatherStats = await fetchData(queryURL);
    if (weatherStats !== undefined) {
      setWeatherVal(weatherStats[0]);
      setCountryName(weatherStats[1]);
      setCityName(weatherStats[2]);
      setOverallWeather(weatherStats[3]);
      setHumidity(weatherStats[4]);
      setWindSpeed(weatherStats[5]);
      setTimeZone(weatherStats[6]);
      setCurrentWeatherLogo(weatherStats[7]);
      return weatherStats;
      
    } else {
      console.log("No Results Found");
      return [];
    }
  } catch (error) {
    console.error("Invalid Location!");
  }
    
  }


  //Updates What is Shown in the Search Box
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
      const weatherLogo = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      console.log(data);
      console.log();
      console.log(data.main.temp);
      //Returns Info from API in an Array
      return [Math.round(data.main.temp) + " F", data.sys.country, data.name, 
        data.weather[0].main, data.main.humidity + "%",
        Math.round(data.wind.speed) + " mph", getTimeBackground(data), weatherLogo];
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }


  //Returns Current Time Of the Place Being Searched in the form of a String 
  //That Represents the Name of a CSS Class to Style the Background
  //Based on the Current Time of the Place.
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