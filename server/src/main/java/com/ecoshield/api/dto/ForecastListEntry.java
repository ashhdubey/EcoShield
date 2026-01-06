package com.ecoshield.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ForecastListEntry {
    private long dt; // Timestamp
    private ForecastMain main;
    private List<ForecastWeather> weather;

    public long getDt() { return dt; }
    public void setDt(long dt) { this.dt = dt; }

    public ForecastMain getMain() { return main; }
    public void setMain(ForecastMain main) { this.main = main; }

    public List<ForecastWeather> getWeather() { return weather; }
    public void setWeather(List<ForecastWeather> weather) { this.weather = weather; }
}