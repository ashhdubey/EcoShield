// Location: server/src/main/java/com/ecoshield/api/service/SuggestionService.java
package com.ecoshield.api.service;

import com.ecoshield.api.dto.EcoShieldData;
import com.ecoshield.api.dto.SuggestionResponse;
import com.ecoshield.api.model.Suggestion;
import com.ecoshield.api.model.User;
import com.ecoshield.api.repository.SuggestionRepository;
import com.ecoshield.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Comparator;

@Service
public class SuggestionService {

    @Autowired
    private SuggestionRepository suggestionRepository;

    @Autowired
    private UserRepository userRepository;

    public SuggestionResponse getSuggestionsForUser(String userEmail, EcoShieldData ecoShieldData) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 1. Get all potentially relevant suggestions
        // We get general tips (by UV, AQI, Grade)
        List<Suggestion> generalSuggestions = suggestionRepository.findGeneralSuggestions(
                ecoShieldData.getUvIndex() != null ? ecoShieldData.getUvIndex().intValue() : 0,
                ecoShieldData.getAqi(),
                ecoShieldData.getEcoShieldGrade()
        );

        // We get personalized tips (by skin type, health)
        List<Suggestion> personalizedSuggestions = suggestionRepository.findRelevantSuggestions(
                ecoShieldData.getUvIndex() != null ? ecoShieldData.getUvIndex().intValue() : 0,
                ecoShieldData.getAqi(),
                ecoShieldData.getEcoShieldGrade(),
                user.getSkinType(),
                user.getHasAsthma(),
                user.getHasAllergies()
        );

        // Combine the lists
        generalSuggestions.addAll(personalizedSuggestions);

        // 2. Filter and prioritize the suggestions
        // Group by type, then for each type, pick the most specific one
        Map<String, List<String>> categorizedSuggestions = generalSuggestions.stream()
                .distinct() // Remove duplicates
                .sorted(Comparator.comparing(SuggestionService::getPriority).reversed()) // Prioritize specific tips
                .collect(Collectors.groupingBy(
                        Suggestion::getSuggestionType, // Group by type (e.g., "UV_TIP")
                        Collectors.mapping(Suggestion::getText, Collectors.toList()) // Map to text
                ));

        // 3. Limit the results (e.g., max 2 tips per category)
        categorizedSuggestions.forEach((type, list) -> {
            if (list.size() > 2) {
                categorizedSuggestions.put(type, list.subList(0, 2));
            }
        });

        return new SuggestionResponse(categorizedSuggestions, ecoShieldData.getEcoShieldGrade());
    }

    // Helper method to rank suggestions by priority
    // Higher number = higher priority
    private static int getPriority(Suggestion s) {
        int priority = 0;
        if (s.getApplicableCondition() != null) priority += 10; // Health tips are most important
        if (s.getApplicableSkinType() != null) priority += 5; // Skin tips are next
        if (s.getMinAqi() != null || s.getMinUv() != null) priority += 2; // Specific UV/AQI tips
        if (s.getApplicableGrade() != null) priority += 1; // Grade-based tips
        // General tips will have a priority of 0
        return priority;
    }
}