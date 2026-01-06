// Location: server/src/main/java/com/ecoshield/api/dto/AirPollutionResponse.java
package com.ecoshield.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AirPollutionResponse {
    private List<AirPollutionListEntry> list;

    // Getter
    public List<AirPollutionListEntry> getList() { return list; }

    // Setter
    public void setList(List<AirPollutionListEntry> list) { this.list = list; }
}