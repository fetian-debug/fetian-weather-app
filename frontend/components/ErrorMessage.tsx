"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorMessage({
  message,
  onRetry,
  className = "",
}: ErrorMessageProps) {
  return (
    <div className={`glass-card p-6 text-center animate-fade-in ${className}`}>
      <div className="flex items-center justify-center gap-3 mb-4">
        <AlertTriangle className="h-8 w-8 text-red-400" />
        <h3 className="text-xl font-semibold text-white">
          Oops! Something went wrong
        </h3>
      </div>

      <p className="text-white/80 mb-6 leading-relaxed">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-200 hover:scale-105"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
