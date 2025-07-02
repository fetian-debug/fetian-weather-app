"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchFormProps {
  onSearch: (location: string) => void;
  isLoading?: boolean;
  className?: string;
}

export default function SearchForm({
  onSearch,
  isLoading = false,
  className = "",
}: SearchFormProps) {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim() && !isLoading) {
      onSearch(location.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-md animate-fade-in ${className}`}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or address..."
          className="search-input pl-10 pr-4"
          disabled={isLoading}
          autoFocus
        />

        <button
          type="submit"
          disabled={!location.trim() || isLoading}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <div className="primary-button py-2 px-4 text-sm hover:scale-105 transition-transform duration-200">
            {isLoading ? "Searching..." : "Get Weather"}
          </div>
        </button>
      </div>
    </form>
  );
}
