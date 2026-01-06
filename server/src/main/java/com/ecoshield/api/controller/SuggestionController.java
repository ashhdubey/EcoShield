// Location: server/src/main/java/com/ecoshield/api/controller/SuggestionController.java
package com.ecoshield.api.controller;

import com.ecoshield.api.dto.EcoShieldData;
import com.ecoshield.api.dto.SuggestionResponse;
import com.ecoshield.api.service.EnvironmentService;
import com.ecoshield.api.service.SuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/suggestions")
public class SuggestionController {

    @Autowired
    private SuggestionService suggestionService;

    @Autowired
    private EnvironmentService environmentService; // We need this to get current data

    @GetMapping
    public ResponseEntity<SuggestionResponse> getSuggestions(
            @RequestParam double lat,
            @RequestParam double lon,
            Authentication authentication
    ) {
        String email = authentication.getName();

        // 1. Get the current environmental data first
        EcoShieldData ecoShieldData = environmentService.getEcoShieldData(lat, lon, email);
        if (ecoShieldData == null) {
            return ResponseEntity.status(500).body(null); // Or some error
        }

        // 2. Pass that data to the suggestion service
        SuggestionResponse response = suggestionService.getSuggestionsForUser(email, ecoShieldData);
        return ResponseEntity.ok(response);
    }
}