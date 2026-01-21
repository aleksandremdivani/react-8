import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import DetailsCard from "./components/DetailsCard";

function App() {
  const [currentCity, setCurrentCity] = useState("Tbilisi");
  const [weather, setWeather] = useState();
  const inputRef = useRef();
  useEffect(() => {
    const fetchWeatherData = async (city) => {
      const { VITE_WEATHER_API_KEY } = import.meta.env;
      console.log(VITE_WEATHER_API_KEY);
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: city,
              appid: VITE_WEATHER_API_KEY,
              units: "metric",
            },
          },
        );
        setWeather(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherData(currentCity);
  }, [currentCity]);

  const handleSearch = () => {
    setCurrentCity(inputRef.current.value);
    inputRef.current.value = "";
  };
  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center gap-8"
      style={{
        backgroundImage: `url(src/assets/tbillisi.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-300 w-full flex gap-8">
        <input
          className="text-white border p-4 flex-1 rounded-md"
          type="text"
          placeholder="Enter..."
          ref={inputRef}
        />
        <button onClick={handleSearch} className="bg-white p-4 rounded-md">
          search
        </button>
      </div>
      {weather && (
        <div className="backdrop-blur-md w-full max-w-300 p-4 rounded-md h-[400px] justify-between flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-[40px] font-bold">{weather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={`${weather.name}`}
            />
          </div>
          <div className="flex gap-x-3 items-center">
            <h3 className="font-bold text-[50px]">
              {Math.round(weather.main.temp)}°C
            </h3>
            <p className="font-semibold text-[30px]">
              {weather.weather[0].description}
            </p>
          </div>
          <div className="flex justify-between">
            <DetailsCard
              label={"Humidity"}
              value={`${weather.main.humidity}%`}
            />
            <DetailsCard
              label={"Wind Speed"}
              value={`${weather.wind.speed} m/s`}
            />
            <DetailsCard label={"Pressure"} value={weather.main.pressure} />
            <DetailsCard
              label={"Visibility"}
              value={`${weather.visibility} meters`}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default App;
