package com.ecoshield.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OpenWeatherMapForecastResponse {
    private List<ForecastListEntry> list;

    public List<ForecastListEntry> getList() { return list; }
    public void setList(List<ForecastListEntry> list) { this.list = list; }
}