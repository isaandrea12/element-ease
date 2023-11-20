import React, { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import "./WeatherApp.css";
import search_icon from "../../assets/search.png";
import clear_icon from "../../assets/clear.png";
import clear_n_icon from "../../assets/clear-n.png";
import pclouds_icon from "../../assets/partial-clouds.png";
import pclouds_n_icon from "../../assets/partial-clouds-n.png";
import cloudy_icon from "../../assets/cloudy.png";
import cloudy_n_icon from "../../assets/cloudy-n.png";
import humidity_icon from "../../assets/humidity.png";
import shower_icon from "../../assets/shower.png";
import shower_n_icon from "../../assets/shower-n.png";
import rain_icon from "../../assets/rain.png";
import rain_n_icon from "../../assets/rain-n.png";
import thunder_icon from "../../assets/thunder.png";
import thunder_n_icon from "../../assets/thunder-n.png";
import snow_icon from "../../assets/snow.png";
import snow_n_icon from "../../assets/snow-n.png";
import mist_icon from "../../assets/mist.png";
import mist_n_icon from "../../assets/mist-n.png";
import wind_icon from "../../assets/wind.png";

const WeatherApp = () => {
  let api_key = "78d878fa92c918700de10b569bd8132e";
  const [cityInput, setCityInput] = useState("New York");
  const [weatherData, setWeatherData] = useState(null);
  const [wIcon, setWIcon] = useState(cloudy_icon);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    search()
  }, [])  

  const search = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${api_key}`,
      );
      const data = await response.json();
      console.log(data) 
     
      if(data.cod === '404') {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000); // Hide alert after 3 seconds
        return;
      }


      if(data.cod === 200) {
        console.log(data);
        setWeatherData(data);


      console.log(data.weather[0].icon)
      if (data.weather[0].icon === "01d") {
        setWIcon(clear_icon);
      } 
      else if (data.weather[0].icon === "01n") {
        setWIcon(clear_n_icon)
      }
      else if (
        data.weather[0].icon === "02d"
      ) {
        setWIcon(pclouds_icon);
      } 
      else if (
        data.weather[0].icon === "02n"
      ) {
        setWIcon(pclouds_n_icon);
      } 
      else if (
        data.weather[0].icon === "03d" || data.weather[0].icon === "04d"
      ) {
        setWIcon(cloudy_icon);
      } 
      else if (
        data.weather[0].icon === "03n" || data.weather[0].icon === "04n"
      ) {
        setWIcon(cloudy_n_icon);
      } 
      else if (
        data.weather[0].icon === "09d"
      ) {
        setWIcon(shower_icon);
      } 
      else if (
        data.weather[0].icon === "09n"
      ) {
        setWIcon(shower_n_icon);
      } 
      else if (
        data.weather[0].icon === "10d"
      ) {
        setWIcon(rain_icon);
      } 
      else if (
        data.weather[0].icon === "10n"
      ) {
        setWIcon(rain_n_icon);
      } 
      else if (
        data.weather[0].icon === "11d"
      ) {
        setWIcon(thunder_icon);
      } 
      else if (
        data.weather[0].icon === "11n"
      ) {
        setWIcon(thunder_n_icon);
      } 
      else if (
        data.weather[0].icon === "12d"
      ) {
        setWIcon(snow_icon);
      } 
      else if (
        data.weather[0].icon === "12n"
      ) {
        setWIcon(snow_n_icon);
      } 
      else if (
        data.weather[0].icon === "13d"
      ) {
        setWIcon(mist_icon);
      } 
      else if (
        data.weather[0].icon === "13n"
      ) {
        setWIcon(mist_n_icon);
      } 
      else {
        setWIcon(clear_icon);
      }
    }
    } catch (error) {
      console.error("Error fetching weather data.");
    }

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
        <div>
            <div className="alert">
                {alert && <Alert variant="filled" severity="error">City not found.</Alert>}
            </div>
            <div className="container">
              <div className="search-bar">
                <input
                  type="text"
                  onChange={(e) => {
                    setCityInput(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  className="cityInput"
                  placeholder="Search..."
                />
                <div
                  className="search-icon"
                  onClick={() => {
                    search();
                  }}
                >
                  <img src={search_icon} alt="search icon" />
                </div>
              </div>
              <div className="weather-img">
                <img src={wIcon} alt="cloud icon" className="smaller-icon" />
              </div>
              <div className="weather-temp">
                {weatherData ? `${Math.round(weatherData.main.temp)}°F` : ""}
              </div>
              <div className="weather-location">
                {weatherData ? `${weatherData.name}` : ""}
              </div>
              <div className="data-container">
                <div className="element">
                  <img src={humidity_icon} alt="" className="icon" />
                  <div className="data">
                    <div className="humidity">
                      {weatherData ? `${weatherData.main.humidity}%` : ""}
                    </div>
                    <div className="text">Humidity</div>
                  </div>
                </div>
                <div className="element">
                  <img src={wind_icon} alt="" className="icon" />
                  <div className="data">
                    <div className="wind">
                      {weatherData ? `${Math.round(weatherData.wind.speed)} mph` : ""}
                    </div>
                    <div className="text">Wind Speed</div>
                  </div>
                </div>
              </div>
              <div className="data-container">
                <div className="data-feels-like">
                  <div className="feels-like">
                    {weatherData ? `${Math.round(weatherData.main.feels_like)}°F` : ""}
                  </div>
                  <div className="text">Feels like</div>
                </div>
              </div>
            </div>
        </div>
  );
};

export default WeatherApp;
