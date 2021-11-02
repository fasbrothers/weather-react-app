import { useEffect } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { cityActions } from "./store/reducer";

function App() {
  const key = useSelector((state) => state.key);
  const baseUrl = useSelector((state) => state.baseUrl);
  const dispatch = useDispatch();
  const city = useSelector((state) => state.city);
  const weather = useSelector((state) => state.weather);

  useEffect(() => {
    try {
      async function getData() {
        const response = await fetch(
          `${baseUrl}weather?q=${city}&units=metric&APPID=${key}`
        );
        const data = await response.json();
        dispatch(cityActions.setWeather(data));
        console.log(data);
      }
      getData();
    } catch (error) {
      console.error(error);
    }
  }, [city, dispatch, key, baseUrl]);
  return (
    <div className="App">
      <section
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 0
              ? "section"
              : "section snow"
            : "section"
        }
      >
        <div className="overlay">
          <Main />
          <Sidebar />
        </div>
      </section>
    </div>
  );
}

export default App;
