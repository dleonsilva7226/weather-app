// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
function App() {
  const weatherAPIKey = "391cbb4a58a8cc222403d449bb858880";
  let city = "London";
  let temperature = 0;
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}`;
  const defaultQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherAPIKey}`;
  // let weatherData = document.getElementById("cityName");
  
  async function fetchData () {
    try {
      const response = await fetch(queryURL);
      if (!response.ok) {
        throw new Error ("Invalid Location");
      }
      const data = await response.json();
      console.log(data.name);  
      // this.temperature = data.main.temp;
      console.log(data.main.temp);
      // console.log(city);
      // console.log(temperature);
      // weatherData.innerText = `City Name: ${city}`;
      
    } catch (error) {
      fetchDefaultInfo();
      console.error(`Error: ${error}`);
    }
  }

  async function fetchDefaultInfo() {
    const response = await fetch (defaultQueryURL);
    const data = await response.json();
    console.log(data);
    console.log("jjdjfj");
    city = data.name;
    // temperature = data.main.temp;
  }

  fetchData();
  return (
    <div className = "weatherHeader">
      <p className = "cityName">City Name: {city}</p>
      <p className = "cityWeather">Weather: {}</p>
    </div>
  );
}

export default App;


//---END OF REACT STUFF---\\

//Fetching OpenWeather API (Weather Data of Some Places)







// if (errorInName) {
//   city = "London";
// }
// finalCityName = city;

// if (errorInName) {
//   city = "London";

// }

// fetch (queryURL)
//   .then(response => {
//       // savedJSON = response.json();
//       return response.json();
//     })
//   .then(data => {
    
//     console.log(`Weather in ${city} is ${data.main.temp}`);
//     temp = data.main.temp;

//   })
//   .catch(error => {
//     // errorInName = true;
//     // return error;
//     console.error(`Error: ${error}`);
    
//   });


// if (errorInName) {
//   city = "London";
// }

//Getting Location of the User (Longitude and Latitude)

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  console.log(`Your Current Location Is:`);
  console.log(`Latitude: ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or Less: ${crd.accuracy} meters.`);


  //Used to Get Longitude and letitude - Fix
  // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`;
}

function error (err) {
  console.warn(`ERROR: (${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
