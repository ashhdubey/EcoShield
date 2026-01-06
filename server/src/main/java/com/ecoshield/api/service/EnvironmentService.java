package com.ecoshield.api.service;

import com.ecoshield.api.dto.*;
import com.ecoshield.api.model.EnvironmentalDataHistory;
import com.ecoshield.api.model.User;
import com.ecoshield.api.repository.HistoryRepository;
import com.ecoshield.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*; // Import Map, Collections, Set, HashSet
import java.util.stream.Collectors;

@Service
public class EnvironmentService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private HistoryRepository historyRepository;
    @Autowired
    private UserRepository userRepository;

    @Value("${openweather.api.key}")
    private String apiKey;

    // API URL constants
    private static final String WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&appid=%s&units=metric";
    private static final String WEATHER_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?lat=%f&lon=%f&appid=%s&units=metric";
    private static final String AIR_POLLUTION_FORECAST_URL = "http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=%f&lon=%f&appid=%s";
    private static final String AIR_POLLUTION_CURRENT_URL = "http://api.openweathermap.org/data/2.5/air_pollution?lat=%f&lon=%f&appid=%s";
    private static final String UV_INDEX_URL = "https://api.openweathermap.org/data/2.5/uvi?lat=%f&lon=%f&appid=%s";
    private static final String GEO_REVERSE_URL = "http://api.openweathermap.org/geo/1.0/reverse?lat=%f&lon=%f&limit=1&appid=%s";
    private static final String GEO_FORWARD_URL = "http://api.openweathermap.org/geo/1.0/direct?q=%s&limit=1&appid=%s";


    public TodayForecastData getTodayForecast(double lat, double lon) {
        AirPollutionResponse airPollutionResponse = fetchAirPollutionForecast(lat, lon);
        OpenWeatherMapForecastResponse weatherForecastResponse = fetchWeatherForecast(lat, lon);
        UvIndexResponse uvIndexResponse = fetchUvIndexResponse(lat, lon);
        double currentUv = (uvIndexResponse != null) ? uvIndexResponse.getValue() : 0.0;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ha").withZone(ZoneId.systemDefault());

        List<AirPollutionListEntry> aqiList = (airPollutionResponse != null && airPollutionResponse.getList() != null)
                ? airPollutionResponse.getList() : Collections.emptyList();
        List<ForecastListEntry> weatherList = (weatherForecastResponse != null && weatherForecastResponse.getList() != null)
                ? weatherForecastResponse.getList() : Collections.emptyList();

        if (aqiList.isEmpty() && weatherList.isEmpty()) {
            System.err.println("Both AQI and Weather forecast data missing for lat/lon: " + lat + "/" + lon);
            return new TodayForecastData(Collections.emptyList());
        }

        // Use weather forecast timestamps as the primary source (more frequent)
        List<HourlyDataPoint> forecastPoints = weatherList.stream()
                .filter(weatherEntry -> weatherEntry != null && weatherEntry.getMain() != null)
                .map(weatherEntry -> {
                    long timestamp = weatherEntry.getDt();
                    Instant instant = Instant.ofEpochSecond(timestamp);
                    String timeLabel = formatter.format(instant).toLowerCase();
                    Double temp = weatherEntry.getMain().getTemp(); // Get temp directly

                    // Find the closest AQI entry by timestamp (within ~1.5 hours)
                    Optional<AirPollutionListEntry> closestAqiEntry = aqiList.stream()
                            .filter(aqiEntry -> aqiEntry != null && aqiEntry.getMain() != null)
                            .min(Comparator.comparingLong(aqiEntry -> Math.abs(aqiEntry.getDt() - timestamp)));

                    // Get AQI if an entry is found within a reasonable time window
                    Integer aqi = closestAqiEntry
                            .filter(entry -> Math.abs(entry.getDt() - timestamp) <= 5400) // 1.5 hours * 3600 seconds
                            .map(entry -> entry.getMain().getAqi())
                            .orElse(null); // Use null if no close AQI found

                    return new HourlyDataPoint(timeLabel, aqi, currentUv, temp);
                })
                .limit(8) // Limit to the first 8 weather forecast entries (24 hours)
                .collect(Collectors.toList());

        // Log the combined data before returning
        System.out.println("Combined Forecast Data Points: " + forecastPoints.size());
        forecastPoints.forEach(p -> System.out.println("Time: " + p.getTime() + ", AQI: " + p.getAqi() + ", UV: " + p.getUv() + ", Temp: " + p.getTemperature()));


        return new TodayForecastData(forecastPoints);
    }

    public EcoShieldData getEcoShieldData(double lat, double lon, String userEmail) {
        WeatherResponse weather = fetchWeather(lat, lon);
        Integer aqi = fetchCurrentAqi(lat, lon);
        UvIndexResponse uvResponse = fetchUvIndexResponse(lat, lon);
        Double uvIndex = (uvResponse != null) ? uvResponse.getValue() : null;
        String locationName = fetchLocationName(lat, lon);

        if (weather == null || locationName == null || aqi == null || uvIndex == null) {
            System.err.println("Essential current data missing for lat/lon: " + lat + "/" + lon);
            return new EcoShieldData(0.0, "N/A", 0.0, 0, "N/A", "Unknown Location");
        }

        String grade = calculateEcoShieldGrade(uvIndex, aqi);

        EcoShieldData data = new EcoShieldData(
                weather.getTemperature(),
                weather.getDescription(),
                uvIndex,
                aqi,
                grade,
                locationName
        );

        if (userEmail != null && !userEmail.isBlank()) {
            userRepository.findByEmail(userEmail).ifPresent(user -> saveOrUpdateHistory(user, data));
        }

        return data;
    }

    public ComparisonResponse getComparisonData(String city1, String city2) {
        Map<String, Double> coords1 = fetchCoordinatesForCity(city1);
        Map<String, Double> coords2 = fetchCoordinatesForCity(city2);

        EcoShieldData data1 = (coords1 != null && coords1.containsKey("lat")) ? getEcoShieldData(coords1.get("lat"), coords1.get("lon"), null) : null;
        EcoShieldData data2 = (coords2 != null && coords2.containsKey("lat")) ? getEcoShieldData(coords2.get("lat"), coords2.get("lon"), null) : null;


        return new ComparisonResponse(data1, data2);
    }

    // --- UPDATED METHOD TO FIX DATABASE DUPLICATES ---
    private void saveOrUpdateHistory(User user, EcoShieldData data) {
        LocalDate today = LocalDate.now();

        // Fetch as a List to safely handle duplicate records
        List<EnvironmentalDataHistory> existingRecords = historyRepository.findByUserAndDateAndLocationName(user, today, data.getLocationName());

        EnvironmentalDataHistory history;

        if (existingRecords.isEmpty()) {
            // Case 1: No record exists, create new
            history = new EnvironmentalDataHistory();
            history.setUser(user);
            history.setDate(today);
            history.setLocationName(data.getLocationName());
        } else {
            // Case 2: Records exist. Pick the first one to update.
            history = existingRecords.get(0);

            // AUTO-FIX: If we found duplicates (size > 1), delete the extras to clean the DB
            if (existingRecords.size() > 1) {
                System.err.println("Duplicate history records found for user " + user.getId() + " at " + data.getLocationName() + ". Cleaning up " + (existingRecords.size() - 1) + " duplicates.");
                for (int i = 1; i < existingRecords.size(); i++) {
                    historyRepository.delete(existingRecords.get(i));
                }
            }
        }

        history.setTemperature(data.getTemperature());
        history.setDescription(data.getDescription());
        history.setUvIndex(data.getUvIndex());
        history.setAqi(data.getAqi());
        history.setEcoShieldGrade(data.getEcoShieldGrade());

        historyRepository.save(history);
    }
    // ------------------------------------------------

    public List<EnvironmentalDataHistory> getHistoryForUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));
        LocalDate sevenDaysAgo = LocalDate.now().minusDays(7);
        return historyRepository.findTop7ByUserAndDateAfterOrderByDateDesc(user, sevenDaysAgo);
    }

    public Map<String, Double> fetchCoordinatesForCity(String city) {
        try {
            String url = String.format(GEO_FORWARD_URL, city, apiKey);
            GeoResponse[] response = restTemplate.getForObject(url, GeoResponse[].class);
            if (response != null && response.length > 0) {
                return Map.of("lat", response[0].getLat(), "lon", response[0].getLon());
            } else {
                System.err.println("No coordinates found for city: " + city);
                return null;
            }
        } catch (Exception e) {
            System.err.println("Error fetching coordinates for city " + city + ": " + e.getMessage());
            return null;
        }
    }

    private String fetchLocationName(double lat, double lon) {
        try {
            String url = String.format(GEO_REVERSE_URL, lat, lon, apiKey);
            ReverseGeoResponse[] response = restTemplate.getForObject(url, ReverseGeoResponse[].class);
            if (response != null && response.length > 0 && response[0] != null) {
                return response[0].getName() + ", " + response[0].getCountry();
            } else {
                System.err.println("No location name found for lat/lon: " + lat + "/" + lon);
                return "Unknown Location";
            }
        } catch (Exception e) {
            System.err.println("Error fetching location name data: " + e.getMessage());
            return "Unknown Location";
        }
    }

    private WeatherResponse fetchWeather(double lat, double lon) {
        try {
            String url = String.format(WEATHER_URL, lat, lon, apiKey);
            return restTemplate.getForObject(url, WeatherResponse.class);
        } catch (HttpClientErrorException e) {
            System.err.println("Error fetching weather data: " + e.getStatusCode() + " for " + lat + "," + lon);
        } catch (Exception e) {
            System.err.println("Error fetching weather data: " + e.getMessage());
        }
        return null;
    }

    private OpenWeatherMapForecastResponse fetchWeatherForecast(double lat, double lon) {
        try {
            String url = String.format(WEATHER_FORECAST_URL, lat, lon, apiKey);
            return restTemplate.getForObject(url, OpenWeatherMapForecastResponse.class);
        } catch (HttpClientErrorException e) {
            System.err.println("Error fetching weather forecast data: " + e.getStatusCode() + " for " + lat + "," + lon);
        } catch (Exception e) {
            System.err.println("Error fetching weather forecast data: " + e.getMessage());
        }
        OpenWeatherMapForecastResponse emptyResponse = new OpenWeatherMapForecastResponse();
        emptyResponse.setList(Collections.emptyList());
        return emptyResponse;
    }


    private Integer fetchCurrentAqi(double lat, double lon) {
        try {
            String url = String.format(AIR_POLLUTION_CURRENT_URL, lat, lon, apiKey);
            AirPollutionResponse response = restTemplate.getForObject(url, AirPollutionResponse.class);
            if (response != null && response.getList() != null && !response.getList().isEmpty()) {
                AirPollutionListEntry firstEntry = response.getList().get(0);
                if (firstEntry != null && firstEntry.getMain() != null) {
                    return firstEntry.getMain().getAqi();
                }
            }
            System.err.println("Current AQI data structure was unexpected for lat/lon: " + lat + "/" + lon);
        } catch (HttpClientErrorException e) {
            System.err.println("Error fetching current AQI data: " + e.getStatusCode() + " for " + lat + "," + lon);
        } catch (Exception e) {
            System.err.println("Error fetching current AQI data: " + e.getMessage());
        }
        return null;
    }

    private AirPollutionResponse fetchAirPollutionForecast(double lat, double lon) {
        try {
            String url = String.format(AIR_POLLUTION_FORECAST_URL, lat, lon, apiKey);
            return restTemplate.getForObject(url, AirPollutionResponse.class);
        } catch (HttpClientErrorException e) {
            System.err.println("Error fetching AQI forecast data: " + e.getStatusCode() + " for " + lat + "," + lon);
        } catch (Exception e) {
            System.err.println("Error fetching AQI forecast data: " + e.getMessage());
        }
        AirPollutionResponse emptyResponse = new AirPollutionResponse();
        emptyResponse.setList(Collections.emptyList());
        return emptyResponse;
    }

    private UvIndexResponse fetchUvIndexResponse(double lat, double lon) {
        try {
            String url = String.format(UV_INDEX_URL, lat, lon, apiKey);
            return restTemplate.getForObject(url, UvIndexResponse.class);
        } catch (HttpClientErrorException e) {
            System.err.println("Error fetching UV index data: " + e.getStatusCode() + " for " + lat + "," + lon);
        } catch (Exception e) {
            System.err.println("Error fetching UV index data: " + e.getMessage());
        }
        return null;
    }

    private String calculateEcoShieldGrade(Double uvIndex, Integer aqi) {
        if (uvIndex == null || aqi == null) return "N/A";
        if (uvIndex > 10 || aqi >= 5) return "E";
        if (uvIndex > 7 || aqi == 4) return "D";
        if (uvIndex > 5 || aqi == 3) return "C";
        if (uvIndex > 2 || aqi == 2) return "B";
        return "A";
    }

}