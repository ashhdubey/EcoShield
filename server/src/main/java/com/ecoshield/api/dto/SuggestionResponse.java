// Location: server/src/main/java/com/ecoshield/api/dto/SuggestionResponse.java
package com.ecoshield.api.dto;

import com.ecoshield.api.model.Suggestion;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SuggestionResponse {

    // NEW: A map where key is the category (e.g., "UV_TIP")
    // and value is a list of suggestion strings.
    private Map<String, List<String>> suggestions;

    // We can still include the grade if needed
    private String ecoShieldGrade;
}