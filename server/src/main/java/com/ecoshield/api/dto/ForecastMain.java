package com.ecoshield.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ForecastMain {
    private double temp;

    public double getTemp() { return temp; }
    public void setTemp(double temp) { this.temp = temp; }
}