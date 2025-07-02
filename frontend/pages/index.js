import { useState } from "react";
import Head from "next/head";
import { Cloud, Github, ExternalLink } from "lucide-react";
import SearchForm from "../components/SearchForm";
import WeatherCard from "../components/WeatherCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { weatherApi } from "../lib/weatherApi";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (location) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const data = await weatherApi.getWeather(location);
      setWeatherData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (weatherData?.fullLocation) {
      handleSearch(weatherData.fullLocation);
    }
  };

  return (
    <>
      <Head>
        <title>WeatherPro - Professional Weather App</title>
        <meta
          name="description"
          content="Get accurate weather information for any location worldwide"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="animate-spin-slow">
                <Cloud className="h-12 w-12 text-white/90" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-shadow-lg">
                Weather
                <span className="gradient-text bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                  Pro
                </span>
              </h1>
            </div>

            <p className="text-xl text-white/80 font-light max-w-2xl mx-auto animate-slide-up">
              Professional weather information at your fingertips. Get accurate
              forecasts for any location worldwide.
            </p>
          </header>

          {/* Search Section */}
          <section
            className="flex justify-center mb-12 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </section>

          {/* Content Section */}
          <section className="flex justify-center">
            {isLoading && (
              <LoadingSpinner message="Searching for location and fetching weather data..." />
            )}

            {error && !isLoading && (
              <ErrorMessage
                message={error}
                onRetry={weatherData ? handleRetry : undefined}
              />
            )}

            {weatherData && !isLoading && !error && (
              <WeatherCard data={weatherData} className="w-full max-w-lg" />
            )}

            {!weatherData && !isLoading && !error && (
              <div
                className="glass-card p-8 text-center max-w-lg animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="mb-6">
                  <div className="text-6xl mb-4 animate-bounce-slow">🌤️</div>
                  <h2 className="text-2xl font-semibold text-white mb-3">
                    Welcome to WeatherPro
                  </h2>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Enter any city, address, or location to get detailed weather
                    information including temperature, humidity, and current
                    conditions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors duration-200">
                    <div className="text-2xl mb-2">🌍</div>
                    <div className="text-white/90 font-medium">
                      Global Coverage
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors duration-200">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-white/90 font-medium">
                      Real-time Data
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors duration-200">
                    <div className="text-2xl mb-2">📱</div>
                    <div className="text-white/90 font-medium">
                      Mobile Ready
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Footer */}
          <footer
            className="text-center mt-16 text-white/60 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center justify-center gap-6 mb-4">
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white/80 transition-colors duration-200"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">View Source</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white/80 transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">API Docs</span>
              </a>
            </div>
            <p className="text-sm">
              © 2024 WeatherPro. Built with Next.js and powered by
              OpenWeatherMap.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
