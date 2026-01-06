package com.ecoshield.api.service;

import com.ecoshield.api.dto.EcoShieldData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RankingService {

    @Autowired
    private EnvironmentService environmentService;

    // Predefined list of top world cities
    private final List<String> worldCities = Arrays.asList(
            "Zurich", "Copenhagen", "Geneva", "Vienna", "Helsinki",
            "Stockholm", "Oslo", "Auckland", "Wellington", "Amsterdam"
    );

    // Predefined list of top cities in India
    private final List<String> indiaCities = Arrays.asList(
            "Indore", "Chandigarh", "Shimla", "Mysore", "Gangtok",
            "Pune", "Ahmedabad", "Bhopal", "Visakhapatnam", "Srinagar"
    );

    public List<EcoShieldData> getRankedWorldCities() {
        return getRankedCityData(worldCities);
    }

    public List<EcoShieldData> getRankedIndiaCities() {
        return getRankedCityData(indiaCities);
    }

    private List<EcoShieldData> getRankedCityData(List<String> cities) {
        // Fetch live data for each city in the list
        List<EcoShieldData> cityDataList = cities.parallelStream()
                .map(city -> {
                    // We need coordinates to get data, so we call a helper method in EnvironmentService
                    // (Note: We're reusing a method from the previous feature)
                    return environmentService.getEcoShieldData(
                            environmentService.fetchCoordinatesForCity(city).get("lat"),
                            environmentService.fetchCoordinatesForCity(city).get("lon"),
                            null
                    );
                })
                .collect(Collectors.toList());

        // Sort the results: Grade 'A' is best, then lower AQI is better
        cityDataList.sort(Comparator
                .comparing(EcoShieldData::getEcoShieldGrade)
                .thenComparing(EcoShieldData::getAqi)
        );

        return cityDataList;
    }
}