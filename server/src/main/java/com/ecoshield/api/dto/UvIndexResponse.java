// Location: server/src/main/java/com/ecoshield/api/dto/UvIndexResponse.java
package com.ecoshield.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UvIndexResponse {
    private double value;

    // Getter
    public double getValue() { return value; }

    // Setter
    public void setValue(double value) { this.value = value; }
}