import axios from "axios";

// Weather API functions (converted from utils)
async function geocode(address) {
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json`;

    const response = await axios.get(url, {
      params: {
        access_token: process.env.MAPBOX_ACCESS_TOKEN,
        limit: 1,
      },
      timeout: 5000,
    });

    if (response.data.features.length === 0) {
      throw new Error("Unable to find location. Try another search.");
    }

    const feature = response.data.features[0];
    return {
      latitude: feature.center[1],
      longitude: feature.center[0],
      location: feature.place_name,
    };
  } catch (error) {
    if (error.response) {
      throw new Error(`Geocoding service error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error("Unable to connect to location services!");
    }
    throw error;
  }
}

async function forecast(latitude, longitude) {
  try {
    const url = "https://api.openweathermap.org/data/2.5/weather";

    const response = await axios.get(url, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: process.env.OPENWEATHER_API_KEY,
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
      summary: `${description}. It is currently ${temperature}°C (feels like ${feelsLike}°C) with ${humidity}% humidity.`,
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
    }
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    // Check for required environment variables
    if (!process.env.OPENWEATHER_API_KEY || !process.env.MAPBOX_ACCESS_TOKEN) {
      return res.status(500).json({
        success: false,
        error: "Server configuration error. Missing API keys.",
      });
    }

    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        error: "Location parameter is required",
      });
    }

    // Get geocoding data
    const geocodeData = await geocode(location);

    // Get weather forecast
    const forecastData = await forecast(
      geocodeData.latitude,
      geocodeData.longitude,
    );

    res.status(200).json({
      success: true,
      data: {
        ...forecastData,
        coordinates: {
          latitude: geocodeData.latitude,
          longitude: geocodeData.longitude,
        },
        fullLocation: geocodeData.location,
      },
    });
  } catch (error) {
    console.error("Weather API Error:", error);

    res.status(500).json({
      success: false,
      error: error.message || "An unexpected error occurred",
    });
  }
}
