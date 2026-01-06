// Location: server/src/main/java/com/ecoshield/api/dto/WeatherResponse.java
package com.ecoshield.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherResponse {

    private String description;
    private double temperature;

    @JsonProperty("weather")
    private void unpackWeather(List<Map<String, Object>> weatherList) {
        if (weatherList != null && !weatherList.isEmpty()) {
            this.description = (String) weatherList.get(0).get("description");
        }
    }

    @JsonProperty("main")
    private void unpackMain(Map<String, Object> main) {
        this.temperature = (Double) main.get("temp");
    }
}