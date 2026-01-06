// Location: server/src/main/java/com/ecoshield/api/dto/AirPollutionListEntry.java
package com.ecoshield.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AirPollutionListEntry {
    private AirPollutionMain main;
    private long dt; // <-- ADD THIS FIELD

    // Getter
    public AirPollutionMain getMain() { return main; }

    // Setter
    public void setMain(AirPollutionMain main) { this.main = main; }

    // --- ADD THESE METHODS ---
    public long getDt() { return dt; }
    public void setDt(long dt) { this.dt = dt; }
    // --- END OF ADDITION ---
}