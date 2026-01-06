// Location: server/src/main/java/com/ecoshield/api/dto/AirPollutionMain.java
package com.ecoshield.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AirPollutionMain {
    private int aqi;

    // Getter
    public int getAqi() { return aqi; }

    // Setter
    public void setAqi(int aqi) { this.aqi = aqi; }
}