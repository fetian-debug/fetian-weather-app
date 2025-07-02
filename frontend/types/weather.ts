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

export interface WeatherCardProps {
  data: WeatherData;
  className?: string;
}

export interface SearchFormProps {
  onSearch: (location: string) => void;
  isLoading?: boolean;
  className?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
