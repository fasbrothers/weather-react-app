import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cityActions } from "../store/reducer";

function Sidebar() {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const weather = useSelector((state) => state.weather);
  const key = useSelector((state) => state.key);
  const baseUrl = useSelector((state) => state.baseUrl);
  const userInput = useSelector((state) => state.userInput);

  const regions = [
    "Andijan",
    "Bukhara",
    "Fargona",
    "Jizzax",
    "Namangan",
    "Navoiy",
    "Qashqadaryo",
    "Tashkent",
    "Nukus",
    "Khiva",
  ];

  useEffect(() => {
    const time = setTimeout(() => {
      if (inputValue !== "") {
        fetch(
          `${baseUrl}weather?q=${userInput.value}&units=metric&APPID=${key}`
        )
          .then((res) => res.json())
          .then((data) => {
            dispatch(cityActions.setWeather(data));
          })
          .catch((err) => console.log(err));
      } else {
        return "";
      }
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [userInput, key, inputValue, baseUrl, dispatch]);

  const inputHandler = (e) => {
    dispatch(cityActions.setUserInput(e.target.value));
    setInputValue(e.target.value);
  };

  const regionClickHandler = (e) => {
    if (e.target.localName === "button") {
      dispatch(cityActions.setCity(e.target.innerText));
    }
  };
  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        <div>
          <input
            type="text"
            placeholder="Another location"
            className="search"
            value={inputValue}
            onChange={inputHandler}
          />
          <button
            className="search-button"
            onClick={() => {
              dispatch(cityActions.setCity(userInput));
              setInputValue("");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
        <div>
          <ul className="regions">
            {regions.map((region, index) => (
              <ul key={index} className="region">
                <button onClick={regionClickHandler}>{region}</button>
              </ul>
            ))}
          </ul>
        </div>
      </div>
      <div className="weather-desc">
        <h4 className="weather-title">Weather Details</h4>
        {typeof weather.main != "undefined" ? (
          <ul className="weather-lists">
            <li className="lists-item">
              <span>Cloudy</span>
              <span className="item-parametrs">{weather.clouds.all}%</span>
            </li>
            <li className="lists-item">
              <span>Humidity</span>
              <span className="item-parametrs">{weather.main.humidity}%</span>
            </li>
            <li className="lists-item">
              <span>Wind</span>
              <span className="item-parametrs">
                {Math.round(weather.wind.speed)}km/h
              </span>
            </li>
            <li className="lists-item">
              <span>Rain</span>
              <span className="item-parametrs">0mm</span>
            </li>
          </ul>
        ) : (
          <p className="showError">Details of weather is not available</p>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
