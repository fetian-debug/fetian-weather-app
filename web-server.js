const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { config, validateConfig } = require("./config/config");

// Validate configuration
try {
  validateConfig();
} catch (error) {
  console.error("Configuration Error:", error.message);
  process.exit(1);
}

const app = express();
const port = config.port;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/weather", async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        error: "Location parameter is required",
      });
    }

    const geocodeData = await geocode(location);
    const forecastData = await forecast(
      geocodeData.latitude,
      geocodeData.longitude,
    );

    res.json({
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
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`🌤️  Weather app server running at http://localhost:${port}`);
});
