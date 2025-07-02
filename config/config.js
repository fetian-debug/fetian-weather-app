require("dotenv").config();

const config = {
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
  mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
};

// Validate required environment variables
const validateConfig = () => {
  const requiredVars = ["openWeatherApiKey", "mapboxAccessToken"];
  const missing = requiredVars.filter((key) => !config[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
};

module.exports = {
  config,
  validateConfig,
};
