  import { useEffect, useState } from 'react'
  import './App.css'
  
  /*images*/
  import clearIcon from './assets/clear.jpg';
  import cloudIcon from './assets/cloud.jpg';
  import drizzleIcon from './assets/drizzle.jpg';
  import rainyIcon from './assets/rainy.jpg';
  import snowIcon from './assets/snow.jpg';
  import windyIcon from './assets/windy.jpg';
  import humdityIcon from './assets/humdity.jpg';
  import searchIcon from './assets/search.jpg';



  // Weather Details

  const WeatherDetails=({icon,temp,city,country,lat,log,humdity,wind})=>{
    return( 
    <>
    <div className='image'>
      <img src={icon} alt="Image" />
    </div>

    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className="lat">latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className="log">logtitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className="data_container">
      <div className="element">
        <img src={humdityIcon} alt="humdity" className="icon" />
        <div className="data">
          <div className="humdity_percent">{humdity}</div>
          <div className="text">Humdity</div>
        </div>
      </div>
      <div className="element">
        <img src={windyIcon} alt="humdity" className="icon" />
        <div className="data">
          <div className="wind_percent">{wind} km/h</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
    </>);
  };



  function App() {
    let api_key="12bd8fa4adfc7e8244ee7895924fe7dc";

    const[text,setText]=useState("coimbatore");
    const [icon, setIcon]= useState(snowIcon);
    const [temp, setTemp]= useState(0);
    const [city, setCity]= useState("Coimbatore");
    const [country, setCountry]= useState("IN");
    const [lat, setLat]= useState(0);
    const [log, setLog]= useState(0);
    const [humdity,setHumidty]=useState(0);
    const [wind,setWind]=useState(0);
    const [cityNotFound, setCityNotFound]=useState(false);
    const[loading,setLoading]=useState(false);
    const[error, setError]=useState(null);

    // ____________________________________________________________________________________________________________________________________

//  particular Icon codes

    const weatherIconMap = {
      "01d":clearIcon,
      "01n":clearIcon,
      "02d":cloudIcon,
      "02n":cloudIcon,
      "03d":drizzleIcon,
      "03n":drizzleIcon,
      "04d":drizzleIcon,
      "04n":drizzleIcon,
      "09d":rainyIcon,
      "09n":rainyIcon,
      "10d":rainyIcon,
      "10n":rainyIcon,
      "13d":snowIcon,
      "13n":snowIcon,
    }
  //  _______________________________________________________________________________________________________________________________________ 

// Fetching data Using OpenWeatherApi

              const search = async() => {
                setLoading(true)
                
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

                try {

                  let res = await fetch(url);
                  let data = await res.json();
                  // console.log(data);
              if (data.cod==="404") {
                console.log("City not found");
                setCityNotFound(true);
                setLoading(false);
                return; 
              }  
              setHumidty(data.main.humidity);
              setWind(data.wind.speed);
              setTemp(Math.floor(data.main.temp));
              setCity(data.name);
              setCountry(data.sys.country);
              setLat(data.coord.lat);
              setLog(data.coord.lon);

              const weatherIconCode=data.weather[0].icon;

              setIcon(weatherIconMap[weatherIconCode] || clearIcon);
              setCityNotFound(false);

              } catch (error) {
                console.error("An error occured:",error.message);
                setError("An error occured while fetching weather data.");
              }finally{
                setLoading(false)

              }

            }

              const handleCity=(e)=>{
                setText(e.target.value);

              };
              const handleKeyDown=(e)=>{
                if (e.key ==="Enter") {
                  search();
                  
                }

              };

              
            // for default content load

            
              useEffect(function () {
                search()
                
              },[]);

    return (
    <>
    

        <div className='container'>
          <div className='input_container'>
            <input type="text"
            className='cityInput' 
            placeholder='Search City'
            onChange={handleCity} 
            value={text} 
            onKeyDown={handleKeyDown}/>

            <div className="search_Icon" onClick={()=>search()}>
            <img src={searchIcon} alt="" />
              
            </div>
          </div>
          


          {loading && <div className="loading_message">Loading...</div>}
          {error && <div className="error_message">{error}</div>}
          {cityNotFound && <div className="city_Not_Found">City not found</div>}

          {!loading && !cityNotFound&&<WeatherDetails icon={icon} 
          temp={temp} 
          city={city} 
          country={country} 
          lat={lat} 
          log={log}
          humdity={humdity}
          wind={wind} />}

          <p className="copyright">
            Designed by <span>Jagan</span>
          </p>
          
        </div>
      
      </>
    )
  }

  export default App
