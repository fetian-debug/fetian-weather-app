import axios from "axios";

// Use Next.js API routes in production, fallback to Express in development
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "" // Use relative URLs in production (same domain)
    : process.env.WEATHER_API_URL || "http://localhost:3000";

export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  description: string;
  summary: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  fullLocation: string;
}

export interface WeatherResponse {
  success: boolean;
  data?: WeatherData;
  error?: string;
}

class WeatherAPI {
  private api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
  });

  async getWeather(location: string): Promise<WeatherData> {
    try {
      const response = await this.api.get<WeatherResponse>("/api/weather", {
        params: { location },
      });

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || "Failed to fetch weather data");
      }

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
          throw new Error(error.response.data.error);
        } else if (error.code === "ECONNABORTED") {
          throw new Error("Request timeout. Please try again.");
        } else if (error.code === "ECONNREFUSED") {
          throw new Error(
            "Unable to connect to weather service. Please try again later.",
          );
        }
      }

      throw new Error(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    }
  }

  async searchLocations(query: string): Promise<string[]> {
    // This could be expanded to provide location suggestions
    // For now, return the query as a single suggestion
    return query.trim() ? [query] : [];
  }
}

export const weatherApi = new WeatherAPI();
