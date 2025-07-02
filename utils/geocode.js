const axios = require("axios");
const { config } = require("../config/config");

const geocode = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json`;

    const response = await axios.get(url, {
      params: {
        access_token: config.mapboxAccessToken,
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
    } else {
      throw error;
    }
  }
};

module.exports = geocode;
