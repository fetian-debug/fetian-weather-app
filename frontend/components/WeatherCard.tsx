"use client";

import { MapPin, Thermometer, Droplets, Eye } from "lucide-react";
import type { WeatherData } from "@/types/weather";

interface WeatherCardProps {
  data: WeatherData;
  className?: string;
}

export default function WeatherCard({
  data,
  className = "",
}: WeatherCardProps) {
  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes("rain")) return "🌧️";
    if (desc.includes("cloud")) return "☁️";
    if (desc.includes("sun") || desc.includes("clear")) return "☀️";
    if (desc.includes("snow")) return "❄️";
    if (desc.includes("thunder")) return "⛈️";
    return "🌤️";
  };

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0) return "text-blue-400";
    if (temp <= 10) return "text-blue-300";
    if (temp <= 20) return "text-green-400";
    if (temp <= 30) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className={`weather-card animate-fade-in ${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="h-5 w-5 text-white/80" />
          <h2 className="text-xl font-semibold text-white text-shadow">
            {data.location}
          </h2>
        </div>
        <p className="text-white/70 text-sm">
          {data.coordinates.latitude.toFixed(2)},{" "}
          {data.coordinates.longitude.toFixed(2)}
        </p>
      </div>

      {/* Main Temperature */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="text-6xl animate-bounce-slow">
            {getWeatherIcon(data.description)}
          </span>
          <div className="text-center">
            <span
              className={`text-5xl font-bold ${getTemperatureColor(data.temperature)} text-shadow-lg`}
            >
              {data.temperature}
            </span>
            <span className="text-2xl text-white/80">°C</span>
          </div>
        </div>
        <p className="text-white/90 text-lg capitalize font-medium">
          {data.description}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Thermometer className="h-5 w-5 text-white/80" />
            <span className="text-white/80 text-sm font-medium">
              Feels like
            </span>
          </div>
          <span
            className={`text-2xl font-bold ${getTemperatureColor(data.feelsLike)}`}
          >
            {data.feelsLike}°C
          </span>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Droplets className="h-5 w-5 text-white/80" />
            <span className="text-white/80 text-sm font-medium">Humidity</span>
          </div>
          <span className="text-2xl font-bold text-blue-300">
            {data.humidity}%
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl animate-slide-up">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="h-4 w-4 text-white/80" />
          <span className="text-white/80 text-sm font-medium">Summary</span>
        </div>
        <p className="text-white/90 text-sm leading-relaxed">{data.summary}</p>
      </div>
    </div>
  );
}
