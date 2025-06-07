// App.jsx
import { useState } from "react";
import "./App.css";
import clearImg from "./assets/clear.png";
import cloudImg from "./assets/cloud.png";
import drizzleImg from "./assets/drizzle.png";
import rainImg from "./assets/rain.png";
import snowImg from "./assets/snow.png";
import humidityImg from "./assets/humidity.png";
import windImg from "./assets/wind.png";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = `c2084eba5dd33e026253a34138329cd8`;

  const getWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
      } else {
        setWeather(null);
        alert(data.message || "Failed to fetch weather data");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("An error occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (description) => {
    const lower = description.toLowerCase();
    if (lower.includes("clear")) return clearImg;
    if (lower.includes("cloud")) return cloudImg;
    if (lower.includes("drizzle")) return drizzleImg;
    if (lower.includes("rain")) return rainImg;
    if (lower.includes("snow")) return snowImg;
    return clearImg;
  };

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={getWeather}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {weather && !loading && (
        <div className="card">
          <img
            src={getWeatherIcon(weather.weather[0].main)}
            alt="weather icon"
            className="weather-icon"
          />
          <h2>{weather.name}</h2>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="desc">{weather.weather[0].description}</p>
          <div className="details">
            <div className="detail-box">
              <img src={humidityImg} alt="humidity" className="icon-small" />
              <p>{weather.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="detail-box">
              <img src={windImg} alt="wind" className="icon-small" />
              <p>{weather.wind.speed} m/s</p>
              <p>Wind</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
