// Path: api/src/main/java/com/ecoshield/api/dto/EcoShieldData.java

package com.ecoshield.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EcoShieldData {
    private Double temperature;
    private String description;
    private Double uvIndex;
    private Integer aqi;
    private String ecoShieldGrade;
    private String locationName; // <-- THE NEW FIELD
}