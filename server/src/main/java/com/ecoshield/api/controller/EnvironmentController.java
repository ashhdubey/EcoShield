// Location: server/src/main/java/com/ecoshield/api/controller/EnvironmentController.java
package com.ecoshield.api.controller;

import com.ecoshield.api.dto.ComparisonResponse;
import com.ecoshield.api.dto.EcoShieldData;
import com.ecoshield.api.dto.TodayForecastData; // <-- IMPORT NEW DTO
import com.ecoshield.api.model.EnvironmentalDataHistory;
import com.ecoshield.api.service.EnvironmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/environment")
public class EnvironmentController {

    @Autowired
    private EnvironmentService environmentService;

    @GetMapping("/public")
    public ResponseEntity<EcoShieldData> getPublicEnvironmentData(@RequestParam double lat, @RequestParam double lon) {
        EcoShieldData data = environmentService.getEcoShieldData(lat, lon, null);
        return ResponseEntity.ok(data);
    }

    @GetMapping
    public ResponseEntity<EcoShieldData> getPersonalizedEnvironmentData(@RequestParam double lat, @RequestParam double lon, Authentication authentication) {
        String userEmail = authentication.getName();
        EcoShieldData data = environmentService.getEcoShieldData(lat, lon, userEmail);
        return ResponseEntity.ok(data);
    }

    // --- ADD NEW ENDPOINT FOR TODAY'S FORECAST ---
    @GetMapping("/today-forecast")
    public ResponseEntity<TodayForecastData> getTodayForecast(@RequestParam double lat, @RequestParam double lon) {
        TodayForecastData data = environmentService.getTodayForecast(lat, lon);
        return ResponseEntity.ok(data);
    }
    // --- END OF NEW ENDPOINT ---

    @GetMapping("/history")
    public ResponseEntity<List<EnvironmentalDataHistory>> getHistory(Authentication authentication) {
        String userEmail = authentication.getName();
        List<EnvironmentalDataHistory> history = environmentService.getHistoryForUser(userEmail);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/compare")
    public ResponseEntity<ComparisonResponse> getComparison(@RequestParam String city1, @RequestParam String city2) {
        ComparisonResponse comparison = environmentService.getComparisonData(city1, city2);
        return ResponseEntity.ok(comparison);
    }
}