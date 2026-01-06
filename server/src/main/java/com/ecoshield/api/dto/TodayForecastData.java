// Location: server/src/main/java/com/ecoshield/api/dto/TodayForecastData.java
package com.ecoshield.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TodayForecastData {
    private List<HourlyDataPoint> forecast;
}