import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import "./WeatherApp.css";
import search_icon from "../../assets/search.png";
import clear_icon from "../../assets/clear.png";
import cloud_icon from "../../assets/cloud.png";
import drizzle_icon from "../../assets/drizzle.png";
import humidity_icon from "../../assets/humidity.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import wind_icon from "../../assets/wind.png";

const WeatherApp = () => {
  let api_key = "78d878fa92c918700de10b569bd8132e";
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [wIcon, setWIcon] = useState(cloud_icon);

  const search = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${api_key}`,
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);

      console.log(data.weather[0].icon);
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWIcon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n" ||
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n" ||
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWIcon(cloud_icon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWIcon(drizzle_icon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n" ||
        data.weather[0].icon === "11d" ||
        data.weather[0].icon === "11n"
      ) {
        setWIcon(rain_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWIcon(snow_icon);
      } else {
        setWIcon(clear_icon);
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
        <img src={wIcon} alt="cloud icon" />
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
        <div className="data">
          <div className="feels-like">
            {weatherData ? `${Math.round(weatherData.main.feels_like)}°F` : ""}
          </div>
          <div className="text">Feels like</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
