// Location: Client/src/lib/api.ts
import apiClient from "./apiClient";

// --- NEW/UPDATED TYPES ---
export interface EcoShieldData {
  temperature: number;
  description: string;
  uvIndex: number;
  aqi: number;
  ecoShieldGrade: string;
  locationName: string;
}

export interface HistoryData {
  date: string;
  ecoShieldGrade: string;
  aqi: number;
  uvIndex: number;
}

// --- NEW: Types for Today's Forecast ---
export interface HourlyDataPoint {
  time: string;
  aqi: number;
  uv: number;
}

export interface TodayForecastData {
  forecast: HourlyDataPoint[];
}
// --- END NEW ---

export interface SuggestionResponse {
  ecoShieldGrade: string;
  suggestions: Record<string, string[]>; 
}

export interface ComparisonResponse {
  city1Data: EcoShieldData | null;
  city2Data: EcoShieldData | null;
}

export interface UserProfile {
  username: string;
  email: string;
  age: number | string | null;
  skinType: string | null;
  gender: string | null;
  hasAsthma: boolean;
  hasAllergies: boolean;
  phoneNumber?: string | null;
  notificationTime?: string | null;
}

// --- API FUNCTIONS ---

// Fetch main dashboard data
export const getEcoShieldData = (lat: number, lon: number) => {
  return apiClient.get<EcoShieldData>("/environment", { params: { lat, lon } });
};

// --- NEW: Function to get Today's Forecast ---
export const getTodayForecast = (lat: number, lon: number) => {
  return apiClient.get<TodayForecastData>("/environment/today-forecast", { params: { lat, lon } });
};
// --- END NEW ---

// Fetch user's 7-day history
export const getHistoryData = () => {
  return apiClient.get<HistoryData[]>("/environment/history");
};

// Fetch categorized suggestions
export const getSuggestions = (lat: number, lon: number) => {
  return apiClient.get<SuggestionResponse>("/suggestions", { params: { lat, lon } });
};

// Fetch comparison data
export const getComparisonData = (city1: string, city2: string) => {
  return apiClient.get<ComparisonResponse>("/environment/compare", {
    params: { city1, city2 },
  });
};

// Fetch user profile
export const getUserProfile = () => {
  return apiClient.get<UserProfile>("/users/me");
};

// Update user profile
export const updateUserProfile = (profileData: Partial<UserProfile>) => {
  return apiClient.put<UserProfile>("/users/me", profileData);
};