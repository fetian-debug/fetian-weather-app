const axios = require("axios");
const { config } = require("../config/config");

const forecast = async (latitude, longitude) => {
  try {
    const url = "https://api.openweathermap.org/data/2.5/weather";

    const response = await axios.get(url, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: config.openWeatherApiKey,
        units: "metric",
      },
      timeout: 5000,
    });

    const data = response.data;
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const location = data.name;

    return {
      location,
      temperature,
      feelsLike,
      humidity,
      description,
      summary: `${description}. It is currently ${temperature}°C (feels like ${feelsLike}��C) with ${humidity}% humidity.`,
    };
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        throw new Error("Invalid API key for weather service");
      } else if (status === 404) {
        throw new Error("Location not found by weather service");
      } else {
        throw new Error(`Weather service error: ${status}`);
      }
    } else if (error.request) {
      throw new Error("Unable to connect to weather service!");
    } else {
      throw error;
    }
  }
};

module.exports = forecast;
