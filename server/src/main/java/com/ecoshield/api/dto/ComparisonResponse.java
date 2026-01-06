// Location: server/src/main/java/com/ecoshield/api/dto/ComparisonResponse.java
package com.ecoshield.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ComparisonResponse {
    // FIX: Changed field names to match frontend expectations
    private EcoShieldData city1Data;
    private EcoShieldData city2Data;
}