document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weatherForm");
  const locationInput = document.getElementById("locationInput");
  const searchButton = form.querySelector(".search-button");
  const buttonText = searchButton.querySelector(".button-text");
  const loadingSpinner = searchButton.querySelector(".loading-spinner");
  const weatherResult = document.getElementById("weatherResult");
  const errorMessage = document.getElementById("errorMessage");

  const showLoading = () => {
    searchButton.disabled = true;
    buttonText.style.display = "none";
    loadingSpinner.style.display = "inline";
  };

  const hideLoading = () => {
    searchButton.disabled = false;
    buttonText.style.display = "inline";
    loadingSpinner.style.display = "none";
  };

  const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    weatherResult.style.display = "none";
  };

  const hideError = () => {
    errorMessage.style.display = "none";
  };

  const displayWeather = (data) => {
    document.getElementById("locationName").textContent = data.fullLocation;
    document.getElementById("coordinates").textContent =
      `${data.coordinates.latitude.toFixed(2)}, ${data.coordinates.longitude.toFixed(2)}`;
    document.getElementById("temperature").textContent = data.temperature;
    document.getElementById("description").textContent = data.description;
    document.getElementById("feelsLike").textContent = `${data.feelsLike}°C`;
    document.getElementById("humidity").textContent = `${data.humidity}%`;

    weatherResult.style.display = "block";
    hideError();
  };

  const fetchWeather = async (location) => {
    try {
      showLoading();
      hideError();

      const response = await fetch(
        `/api/weather?location=${encodeURIComponent(location)}`,
      );
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      displayWeather(result.data);
    } catch (error) {
      showError(error.message || "Failed to fetch weather data");
    } finally {
      hideLoading();
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();

    if (location) {
      fetchWeather(location);
    }
  });

  // Auto-focus input
  locationInput.focus();
});
