// Location: server/src/main/java/com/ecoshield/api/dto/GeoResponse.java
package com.ecoshield.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GeoResponse {
    private double lat;
    private double lon;

    // Getters
    public double getLat() { return lat; }
    public double getLon() { return lon; }

    // Setters (optional, but good practice for Jackson)
    public void setLat(double lat) { this.lat = lat; }
    public void setLon(double lon) { this.lon = lon; }
}