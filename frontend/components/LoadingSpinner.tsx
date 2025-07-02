"use client";

import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`glass-card p-8 text-center ${className}`}
    >
      <div className="flex items-center justify-center gap-4 mb-6">
        {weatherIcons.map((Icon, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          >
            <Icon className="h-8 w-8 text-white/80" />
          </motion.div>
        ))}
      </div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-white mb-2"
      >
        Getting Your Weather
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/70"
      >
        {message}
      </motion.p>

      {/* Progress bar animation */}
      <div className="mt-6 w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}
