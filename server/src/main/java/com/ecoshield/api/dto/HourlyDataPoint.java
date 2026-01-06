// Location: server/src/main/java/com/ecoshield/api/dto/HourlyDataPoint.java
package com.ecoshield.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class HourlyDataPoint {
    private String time;
    private Integer aqi;
    private Double uv;
    private Double temperature; // <-- ADD THIS FIELD
}