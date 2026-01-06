// Location: server/src/main/java/com/ecoshield/api/dto/ReverseGeoResponse.java
package com.ecoshield.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReverseGeoResponse {
    private String name;
    private String country;

    // Getters
    public String getName() { return name; }
    public String getCountry() { return country; }

    // Setters
    public void setName(String name) { this.name = name; }
    public void setCountry(String country) { this.country = country; }
}