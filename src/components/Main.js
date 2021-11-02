import React from "react";
import { useSelector } from "react-redux";

function Main() {
  const weather = useSelector((state) => state.weather);

  const getDate = (s) => {
    let months = [
      "January",
      "Febraury",
      "Mart",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = days[s.getDay()];
    const date = s.getDate();
    const month = months[s.getMonth()];
    const year = s.getFullYear().toString();
    const hour =
      s.getHours().toString().length === 1 ? "0" + s.getHours() : s.getHours();
    const minutes =
      s.getMinutes().toString().length === 1
        ? "0" + s.getMinutes()
        : s.getMinutes();

    return `${hour}:${minutes} ${day}, ${date} ${month} '${year.substring(
      2,
      4
    )}`;
  };

  return (
    <div className="main">
      <a href="/" className="logo">
        the.weather
      </a>
      {typeof weather.name != "undefined" ? (
        <div className="weather">
          <div className="weather-info">
            <span className="weather-degree">
              {Math.ceil(weather.main.temp)}°
            </span>
            <span className="weather-city">{weather.name}</span>
            <div className="weather-date">{getDate(new Date())}</div>
          </div>
          <div className="weather-icon">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <div className="weather-status">{weather.weather[0].main}</div>
          </div>
        </div>
      ) : (
        <p className="showError">Weather description is not available</p>
      )}
    </div>
  );
}

export default Main;
