import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


export default App;


//---END OF REACT STUFF---\\

//Fetching OpenWeather API (Weather Data of Some Places)

const weatherAPIKey = "391cbb4a58a8cc222403d449bb858880";
const city = prompt("Please Provide the City that You Would Like the Weather To?");
const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}`;
fetch (queryURL)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(`Error: ${error}`));


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
}

function error (err) {
  console.warn(`ERROR: (${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
