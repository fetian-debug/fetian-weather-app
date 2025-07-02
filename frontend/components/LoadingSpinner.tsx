"use client";

import { Cloud, Sun, CloudRain } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export default function LoadingSpinner({
  message = "Fetching weather data...",
  className = "",
}: LoadingSpinnerProps) {
  const weatherIcons = [Cloud, Sun, CloudRain];

  return (
    <div className={`glass-card p-8 text-center animate-fade-in ${className}`}>
      <div className="flex items-center justify-center gap-4 mb-6">
        {weatherIcons.map((Icon, index) => (
          <div
            key={index}
            className="animate-bounce"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <Icon className="h-8 w-8 text-white/80" />
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold text-white mb-2 animate-slide-up">
        Getting Your Weather
      </h3>

      <p
        className="text-white/70 animate-slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        {message}
      </p>

      {/* Progress bar animation */}
      <div className="mt-6 w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse"
          style={{ width: "60%" }}
        />
      </div>
    </div>
  );
}
