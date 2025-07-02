"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Github, ExternalLink } from "lucide-react";
import SearchForm from "@/components/SearchForm";
import WeatherCard from "@/components/WeatherCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { weatherApi } from "@/lib/weatherApi";
import type { WeatherData } from "@/types/weather";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (location: string) => {
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
    <main className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Cloud className="h-12 w-12 text-white/90" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-shadow-lg">
              Weather
              <span className="gradient-text bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Pro
              </span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-white/80 font-light max-w-2xl mx-auto"
          >
            Professional weather information at your fingertips. Get accurate
            forecasts for any location worldwide.
          </motion.p>
        </motion.header>

        {/* Search Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </motion.section>

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="glass-card p-8 text-center max-w-lg"
            >
              <div className="mb-6">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-6xl mb-4"
                >
                  🌤️
                </motion.div>
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
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-2">🌍</div>
                  <div className="text-white/90 font-medium">
                    Global Coverage
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-white/90 font-medium">
                    Real-time Data
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="text-white/90 font-medium">Mobile Ready</div>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16 text-white/60"
        >
          <div className="flex items-center justify-center gap-6 mb-4">
            <a
              href="#"
              className="flex items-center gap-2 hover:text-white/80 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="text-sm">View Source</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 hover:text-white/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm">API Docs</span>
            </a>
          </div>
          <p className="text-sm">
            © 2024 WeatherPro. Built with Next.js and powered by
            OpenWeatherMap.
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
